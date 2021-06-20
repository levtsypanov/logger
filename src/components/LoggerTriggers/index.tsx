import * as React from 'react';

import * as logger from '../../Logger/tools';

import * as API from './apiCalls';

import './index.scss';

export const LoggerTriggers: React.FunctionComponent = () => {
	React.useEffect(() => {
		logger.debug({
			category: 'LoggerTriggers',
			action: 'component',
			message: 'mounted'
		});
	}, []);

	const throwException = () => {
		throw new Error('manually triggered an exception');
	};

	const triggerDebug = () => {
		logger.debug({
			category: 'LoggerTriggers',
			action: 'button click',
			message: 'the button debug was clicked'
		});
	};

	const triggerInfo = () => {
		logger.info({
			category: 'LoggerTriggers',
			action: 'button click',
			message: 'the button info was clicked'
		});
	};

	const triggerWarn = () => {
		logger.warn({
			category: 'LoggerTriggers',
			action: 'button click',
			message: 'the button warn was clicked'
		});
	};

	const triggerError = () => {
		logger.error({
			category: 'LoggerTriggers',
			action: 'button click',
			message: 'the button error was clicked'
		});
	};

	const triggerException = () => {
		logger.exception({
			category: 'LoggerTriggers',
			action: 'button click',
			message: 'the button exception was clicked'
		});
	};

	const callApiSusscess = async () => {
		await API.callSuccess();
	};

	const callApiTimeout = async () => {
		await API.callTimeout();
	};

	const callApiNetworkError = async () => {
		await API.callNetworkError();
	};

	const callApiInternalServerError = async () => {
		await API.callInternalServerError();
	};

	return (
		<div className="logger-triggers">
			<div className="logger-triggers__title">Test Logger support</div>
			<div className="logger-triggers__trigger-set">
				<div className="logger-triggers__label">throw</div>
				<button className="btn btn--exception" onClick={throwException}>
					EXCEPTION
				</button>
			</div>
			<div className="logger-triggers__trigger-set">
				<div className="logger-triggers__label">trigger log</div>
				<button className="btn btn--debug" onClick={triggerDebug}>
					DEBUG
				</button>
				<button className="btn btn--info" onClick={triggerInfo}>
					INFO
				</button>
				<button className="btn btn--warn" onClick={triggerWarn}>
					WARN
				</button>
				<button className="btn btn--error" onClick={triggerError}>
					ERROR
				</button>
				<button className="btn btn--exception" onClick={triggerException}>
					EXCEPTION
				</button>
			</div>
			<div className="logger-triggers__trigger-set">
				<div className="logger-triggers__label">API calls</div>
				<button className="btn btn--success" onClick={callApiSusscess}>
					SUCCESS
				</button>
				<button className="btn btn--timeout" onClick={callApiTimeout}>
					TIMEOUT
				</button>
				<button
					className="btn btn--network-error"
					onClick={callApiNetworkError}
				>
					NETWORK ERROR
				</button>
				<button
					className="btn btn--internal-server-error"
					onClick={callApiInternalServerError}
				>
					INTERNAL SERVER ERROR
				</button>
			</div>
		</div>
	);
};

export default LoggerTriggers;
