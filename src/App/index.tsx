import * as React from 'react';
import LoggerTriggers from '../components/LoggerTriggers';

import './index.scss';

export const App: React.FunctionComponent = () => (
	<div className="app">
		<h1>Logger</h1>
		<h2>Handle logs, errors, exceptions and send them to the server</h2>
		<hr />
		<LoggerTriggers />
	</div>
);

export default App;
