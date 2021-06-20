//---------------------------------------------------------------------------//

export const TO_STRING = {}.toString;

export const TRUTHY = /^(?:t(?:rue)?|y(?:es)?|on|1)$/i;

export const FALSY = /^(?:f(?:alse)?|no?|off|0)$/i;

//---------------------------------------------------------------------------//

export enum JSTypeof {
	UNDEFINED = 'undefined',
	FUNCTION = 'function',
	OBJECT = 'object',
	STRING = 'string',
	NUMBER = 'number'
}

//---------------------------------------------------------------------------//

export type TJSObject = Record<string, any>;

export type TJSValue = TJSObject | any;

export type TFunction<Tuple extends any[] = any[], Return = any> = (
	...args: Tuple
) => Return;

//---------------------------------------------------------------------------//

export enum API {
	IPIFY = 'https://api.ipify.org?format=json',

	LOGGER = '/api/logger',

	NETWORK_ERROR = '/api/networkError',
	TIMEOUT = 'api/timeout',
	INTERNAL_SERVER_ERROR = 'api/internal-server-error',
	SUCCESS = 'api/success'
}

//---------------------------------------------------------------------------//

export enum LogLevel {
	DEBUG = 'debug',
	INFO = 'info',
	WARN = 'warn',
	ERROR = 'error',
	EXCEPTION = 'exception'
}

export interface IDictionary<T = any> {
	[key: string]: T;
}

export interface ILog {
	/** date outputed as ISO 8601 string */
	timestamp: string;

	/** current web browser url */
	app_url: string;

	/** web browser user agent */
	user_agent: string;

	/** describes a feature / page */
	category: string;

	/** describes an action, like button click, API call, etc */
	action: string;

	/** log level */
	level: LogLevel;

	/** log message */
	message: string;

	/** extra data/information to be logged should be place inside */
	payload?: TJSObject;
}

export interface ILogOptions extends IDictionary {
	message: string;
	action?: string;
	category?: string;
}

export type TBuildLogObjectOptions =
	| [ILogOptions, string, string]
	| ILogOptions
	| string;

//---------------------------------------------------------------------------//
