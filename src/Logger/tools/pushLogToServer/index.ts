import axios from 'axios';

import { ILog, API } from '../definitions';

// define the mocked HTTP responses
import { defineMock } from './mock';
defineMock(axios);

export const pushLogToServer = async (logObject: ILog) =>
	axios.post(API.LOGGER, logObject);

export default pushLogToServer;
