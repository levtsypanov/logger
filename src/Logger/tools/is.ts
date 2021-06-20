import * as React from 'react';

import { TO_STRING, TRUTHY, JSTypeof, TFunction } from './definitions';

export const isFunction = <T extends TFunction>(value: any): value is T =>
	value !== null && typeof value === JSTypeof.FUNCTION;

export const isUndefined = <T extends object>(value: any): value is T =>
	value !== null && typeof value === JSTypeof.UNDEFINED;

const isObjectBasicCheck = <T extends object>(value: any): value is T =>
	value !== null && typeof value === JSTypeof.OBJECT;

export const isObject = <T extends object>(value: any): value is T =>
	isObjectBasicCheck(value) && TO_STRING.call(value) === '[object Object]';

export const isArray = <T extends []>(value: any): value is T =>
	Array.isArray(value);

export const isString = <T extends string>(value: any): value is T =>
	value !== null &&
	typeof value === JSTypeof.STRING &&
	TO_STRING.call(value) === '[object String]';

export const isNumber = <T extends number>(value: any): value is T =>
	value !== null && typeof value === JSTypeof.NUMBER;

export const isTrue = (value: any): boolean => TRUTHY.test(value) && !!value;

export const isReactElement = <T extends React.ReactNode>(
	value: any
): value is T => isObjectBasicCheck(value) && '$$typeof' in value;

export const isEmptyChildren = (value: React.ReactNode) =>
	React.Children.count(value) === 0;
