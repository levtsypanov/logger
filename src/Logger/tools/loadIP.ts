/*
A Simple Public IP Address API  
https://www.ipify.org/
*/
import axios from 'axios';

import { API } from './definitions';

export interface IIpifyResponseData {
	ip: string;
}

export const loadIP = async () => {
	const { data } = await axios.get<IIpifyResponseData>(API.IPIFY);
	return data;
};

export default loadIP;
