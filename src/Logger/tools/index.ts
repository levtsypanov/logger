import { isArray, isObject, isString } from './is';
import { loadIP } from './loadIP';
import { pushLogToServer } from './pushLogToServer';
import {
	LogLevel,
	TFunction,
	ILogOptions,
	TBuildLogObjectOptions,
	ILog
} from './definitions';

//---------------------------------------------------------------------------//

(window as any).__loggerCachedData__ = {
	DEBUG_LOG_OBJECT: false,
	outputToBrowserConsole: true,
	initialized: false,
	appUrl: window.location.origin,
	userAgent: window.navigator.userAgent,
	userIP: null,
	loggerLevel: null,
	loggerCategory: null
};

//---------------------------------------------------------------------------//

const LOGGER_BROWSER_CONSOLE = {
	[LogLevel.DEBUG]: console.log,
	[LogLevel.INFO]: console.info,
	[LogLevel.WARN]: console.warn,
	[LogLevel.ERROR]: console.error,
	[LogLevel.EXCEPTION]: console.error
};

const LOGGER_LEVEL_ACCEPTS = {
	[LogLevel.DEBUG]: [
		LogLevel.DEBUG,
		LogLevel.INFO,
		LogLevel.WARN,
		LogLevel.ERROR,
		LogLevel.EXCEPTION
	],
	[LogLevel.INFO]: [
		LogLevel.INFO,
		LogLevel.WARN,
		LogLevel.ERROR,
		LogLevel.EXCEPTION
	],
	[LogLevel.WARN]: [LogLevel.WARN, LogLevel.ERROR, LogLevel.EXCEPTION],
	[LogLevel.ERROR]: [LogLevel.ERROR, LogLevel.EXCEPTION],
	[LogLevel.EXCEPTION]: [LogLevel.EXCEPTION]
};

//---------------------------------------------------------------------------//

/**
 * get a string formatted date
 *
 * @param {Date} date
 *
 * @return {string} data as formatted string
 */
const formatDateToString: TFunction<[Date | string], string> = date => {
	date = isString(date) ? new Date(date) : date;
	const pad2: TFunction<[number], string> = n => (n < 10 ? '0' : '') + n;
	const yearStr = date.getFullYear();
	const monthStr = pad2(date.getMonth() + 1);
	const dateStr = pad2(date.getDate());
	const hoursStr = pad2(date.getHours());
	const minutesStr = pad2(date.getMinutes());
	const secondsStr = pad2(date.getSeconds());
	return `${yearStr}-${monthStr}-${dateStr} ${hoursStr}:${minutesStr}:${secondsStr}`;
};

const defineUserIP = async () => {
	try {
		const res = await loadIP();
		(window as any).__loggerCachedData__.userIP = res.ip;
	} catch (e) {
		console.error(e);
	}
};

//---------------------------------------------------------------------------//

const setLoggerLevel = (loggerLevel: LogLevel = LogLevel.ERROR) =>
	((window as any).__loggerCachedData__.loggerLevel = loggerLevel);

const setLoggerCategory = (loggerCategory: string = '') =>
	((window as any).__loggerCachedData__.loggerCategory = loggerCategory);

const buildLogMessage: TFunction<[ILogOptions], string> = ({
	message,
	action = '',
	category = ''
}) => {
	let prefix = '';
	if (category && action) {
		prefix = `${category} - ${action}: `;
	} else if (category && !action) {
		prefix = `${category}: `;
	} else if (!category && action) {
		prefix = `${action}: `;
	}
	return `${prefix}${message}`;
};

const buildLogObject: TFunction<[LogLevel, TBuildLogObjectOptions], ILog> = (
	level,
	options
) => {
	const cachedData = (window as any).__loggerCachedData__;
	let baseLogObject: Partial<ILog> = {
		timestamp: new Date().toISOString(),
		app_url: cachedData.appUrl,
		user_agent: cachedData.userAgent,
		category: cachedData.loggerCategory,
		level
	};
	const basePayload = {
		ip_address: cachedData.userIP,
		current_url: window.location.href
	};

	if (isArray(options)) {
		const [pValue, pAction = `log ${level}`, pCategory = ''] = options;
		const {
			message,
			action = pAction,
			category = pCategory,
			...payload
		} = pValue;
		return {
			...baseLogObject,
			action,
			message: buildLogMessage({ message, action, category }),
			payload: {
				...basePayload,
				...payload
			}
		} as ILog;
	} else if (isObject(options)) {
		const {
			message,
			action = `log ${level}`,
			category = '',
			...payload
		} = options as ILogOptions;
		return {
			...baseLogObject,
			action,
			message: buildLogMessage({ message, action, category }),
			payload: {
				...basePayload,
				...payload
			}
		} as ILog;
	} else if (isString(options)) {
		return {
			...baseLogObject,
			action: `log ${level}`,
			message: options,
			payload: basePayload
		} as ILog;
	} else {
		return {
			...baseLogObject,
			action: `log ${level}`,
			message: JSON.stringify(options),
			payload: basePayload
		} as ILog;
	}
};

const buildBrowserConsoleOuput = (logObject: ILog) => {
	const cachedData = (window as any).__loggerCachedData__;
	if (cachedData.outputToBrowserConsole) {
		const { timestamp, level, category, message } = logObject;
		let msg = `[${formatDateToString(
			timestamp
		)}] ${level} - ${category}: ${message}`;
		if (cachedData.DEBUG_LOG_OBJECT) {
			msg += `\n\nlog object: ${JSON.stringify(logObject, null, 2)}`;
		}
		LOGGER_BROWSER_CONSOLE[level](msg);
	}
};

const log: TFunction<[LogLevel, TBuildLogObjectOptions], Promise<any>> = async (
	level,
	args
) => {
	const cachedData = (window as any).__loggerCachedData__;

	if (isArray(args) && Array(args).length === 1) {
		args = args[0];
	}

	if (!cachedData.loggerLevel) {
		console.error('[Logger Tool] there is no level defined.');
		return;
	}

	if (isObject(args) && 'category' in args) {
		cachedData.loggerCategory = (args as ILogOptions).category;
	}

	if (!cachedData.loggerCategory) {
		console.error(
			'[Logger Tool] there is no category defined, please set it.\n\nUsage: logger.setCategory(string)'
		);
		return;
	}
	const loggerAcceptsLevels =
		(LOGGER_LEVEL_ACCEPTS as any)[cachedData.loggerLevel] || [];

	if (!loggerAcceptsLevels.includes(level)) {
		return;
	}
	const logObject = buildLogObject(level, args);
	buildBrowserConsoleOuput(logObject as ILog);
	pushLogToServer(logObject);
};

//---------------------------------------------------------------------------//

/**
 * extract useful information from an Error object received on the `catch` block
 *
 * @param {Error} error
 */
export const processExceptionError = (error: Error) => {
	const { name: errorName, stack, message: errorMessage } = error;
	return {
		errorName,
		errorMessage,
		errorAsJSONString: JSON.stringify(error),
		...(stack ? { errorStack: JSON.stringify(stack) } : {})
	};
};

//---------------------------------------------------------------------------//

export const configLogger = async (
	loggerLevel = LogLevel.ERROR,
	outputToBrowserConsole = false,
	DEBUG_LOG_OBJECT = false
) => {
	console.info('logger.config start...');
	const cachedData = (window as any).__loggerCachedData__;
	if (!cachedData.initialized) {
		await defineUserIP();
		cachedData.loggerLevel = loggerLevel;
		cachedData.initialized = true;
		cachedData.outputToBrowserConsole = outputToBrowserConsole;
		cachedData.DEBUG_LOG_OBJECT = DEBUG_LOG_OBJECT;
		console.log(cachedData);
	}
	console.info('logger.config done.');
};

export const config = configLogger;
export const setLevel = setLoggerLevel;
export const setCategory = setLoggerCategory;

export const debug: TFunction = (...args) =>
	log(LogLevel.DEBUG, args as TBuildLogObjectOptions);
export const info: TFunction = (...args) =>
	log(LogLevel.INFO, args as TBuildLogObjectOptions);
export const warn: TFunction = (...args) =>
	log(LogLevel.WARN, args as TBuildLogObjectOptions);
export const error: TFunction = (...args) =>
	log(LogLevel.ERROR, args as TBuildLogObjectOptions);
export const exception: TFunction = (...args) =>
	log(LogLevel.EXCEPTION, args as TBuildLogObjectOptions);

export { LogLevel };
