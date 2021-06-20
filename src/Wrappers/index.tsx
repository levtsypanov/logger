import * as React from 'react';

import LoggerErrorBoundaries from '../Logger/ErrorBoundaries';

export const Wrappers: React.FunctionComponent = ({ children }) => (
	<>
		<LoggerErrorBoundaries>{children}</LoggerErrorBoundaries>
	</>
);

export default Wrappers;
