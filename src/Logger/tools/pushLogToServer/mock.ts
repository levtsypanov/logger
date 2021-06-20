/*
  https://github.com/ctimmerm/axios-mock-adapter
*/
import { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { ILog, API, TFunction } from '../definitions';

export const defineMock: TFunction<[AxiosInstance]> = (axios) => {
	if (!axios) {
		return;
	}

	const mock = new MockAdapter(axios, { onNoMatch: 'passthrough' });

	mock.onPost(API.LOGGER).reply((config) => {
		let { data } = config;
		const log = JSON.parse(data) as ILog;
		const { timestamp, level, message } = log;
		console.log(
			`\n[mocked server] logger API endpoint >>>\n[${timestamp}][${level}] ${message}`,
			`\n\nrequest config: `,
			config,
			`\nrequest body:`,
			data,
			'\n\n<<< [mocked server] logger API endpoint\n'
		);
		return Promise.resolve([200, 'saved']);
	});

	//----------//

	mock.onGet(API.NETWORK_ERROR).networkError();

	mock.onGet(API.TIMEOUT).timeout();

	mock.onGet(API.INTERNAL_SERVER_ERROR).reply((_) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve([500, 'error']);
			}, 1500); // delay 1.5s
		});
	});

	mock.onGet(API.SUCCESS).reply(200, 'success');
};

export default defineMock;
