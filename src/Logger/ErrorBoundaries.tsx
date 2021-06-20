/*
  Error Boundaries | React Docs
  https://reactjs.org/docs/error-boundaries.html

  React 16 Error handling with componentDidCatch() | LeanJS - Medium
  https://medium.com/leanjs/react-16-error-handing-with-componentdidcatch-fa4e248d45d7

  Error Handling Using Error Boundaries in React | JavaScript in Plain English - Medium
  https://medium.com/javascript-in-plain-english/error-handling-using-error-boundaries-in-react-e7c8f27d778e
*/
import * as React from 'react';

import * as logger from './tools';

class LoggerErrorBoundaries extends React.Component {
	componentDidMount() {
		logger.debug({
			category: 'LoggerErrorBoundaries',
			action: 'component',
			message: 'mounted'
		});
	}

	componentDidCatch(error: Error, errorInfo: any) {
		logger.exception({
			category: 'LoggerErrorBoundaries',
			message: 'React LoggerErrorBoundaries.componentDidCatch',
			errorInfo,
			...logger.processExceptionError(error)
		});
	}

	render() {
		return <React.Fragment>{this.props.children}</React.Fragment>;
	}
}

export default LoggerErrorBoundaries;
