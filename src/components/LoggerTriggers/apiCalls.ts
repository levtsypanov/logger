import axios from 'axios';

import * as logger from '../../Logger/tools';

import { API } from '../../Logger/tools/definitions';

const CATEGORY = 'LoggerTriggers';

export const callSuccess = async () => {
	const apiURL = API.SUCCESS;
	const baseLogObject = {
		category: CATEGORY,
		action: 'callSuccess',
		apiURL
	};
	logger.info({
		...baseLogObject,
		message: 'trigger HTTP GET'
	});
	try {
		const result = await axios.get(apiURL);
		logger.info({
			...baseLogObject,
			message: 'success on HTTP GET'
		});
		return result;
	} catch (e) {
		logger.exception({
			message: 'error on HTTP GET',
			...baseLogObject,
			...logger.processExceptionError(e)
		});
	}
};

export const callTimeout = async () => {
	const apiURL = API.TIMEOUT;
	const baseLogObject = {
		category: CATEGORY,
		action: 'callTimeout',
		apiURL
	};
	logger.info({
		...baseLogObject,
		message: 'trigger HTTP GET'
	});
	try {
		await axios.get(apiURL);
		logger.info({
			...baseLogObject,
			message: 'success on HTTP GET'
		});
	} catch (e) {
		logger.exception({
			message: 'error on HTTP GET',
			...baseLogObject,
			...logger.processExceptionError(e)
		});
	}
};

export const callNetworkError = async () => {
	const apiURL = API.NETWORK_ERROR;
	const baseLogObject = {
		category: CATEGORY,
		action: 'callNetworkError',
		apiURL
	};
	logger.info({
		...baseLogObject,
		message: 'trigger HTTP GET'
	});
	try {
		await axios.get(apiURL);
		logger.info({
			...baseLogObject,
			message: 'success on HTTP GET'
		});
	} catch (e) {
		logger.exception({
			message: 'error on HTTP GET',
			...baseLogObject,
			...logger.processExceptionError(e)
		});
	}
};

export const callInternalServerError = async () => {
	const apiURL = API.INTERNAL_SERVER_ERROR;
	const baseLogObject = {
		category: CATEGORY,
		action: 'callInternalServerError',
		apiURL
	};
	logger.info({
		...baseLogObject,
		message: 'trigger HTTP GET'
	});
	try {
		await axios.get(API.INTERNAL_SERVER_ERROR);
		logger.info({
			...baseLogObject,
			message: 'success on HTTP GET'
		});
	} catch (e) {
		logger.exception({
			message: 'error on HTTP GET',
			...baseLogObject,
			...logger.processExceptionError(e)
		});
	}
};
