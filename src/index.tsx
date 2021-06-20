import * as React from 'react';
import { render } from 'react-dom';

import Wrappers from './Wrappers';
import App from './App';

import * as logger from './Logger/tools';

(async () => {
	await logger.config(
		logger.LogLevel.DEBUG,
		true, // outputToBrowserConsole
		false // DEBUG_LOG_OBJECT
	);

	window.onerror = (message, source, line, column, error) => {
		console.error(message);
		logger.exception({
			category: 'Global Error Handler',
			message,
			source,
			line,
			column,
			...(error ? error : {})
		});
		return true;
	};

	const rootElement = document.getElementById('root');
	render(
		<Wrappers>
			<App />
		</Wrappers>,
		rootElement
	);
})();
