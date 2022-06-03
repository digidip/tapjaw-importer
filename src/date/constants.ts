/* eslint-disable quotes */
export const REGEX_DATE_YYYY_MM_DD = /^20\d{2}-(0[1-9]|1(0|1|2))-(0[1-9]|1[0-9]|2[0-9]|3(0|1))$/;
export const REGEX_DATE_ISO8601 = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})[+-](\d{2}):(\d{2})/;

export const YYYY_MM_DD = 'y-MM-dd';
export const DATE_TIME = 'y-MM-dd HH:mm:ss';
export const YYYY_MM_DD_T_TIME = "y-MM-dd'T'HH:mm:ss";
export const YYYY_MM_DD_TIME_OFFSET = 'y-MM-dd HH:mm:ssZZ';
export const YYYY_MM_DD_TIME_MS_OFFSET = 'y-MM-dd HH:mm:ss.SSSZZ';
export const YYYY_MM_DD_T_TIME_OFFSET = "y-MM-dd'T'HH:mm:ssZZ";
export const YYYY_MM_DD_T_TIME_MS_OFFSET = "y-MM-dd'T'HH:mm:ss.SSSZZ";
export const YYYY_MM_DD_T_TIME_Z = "y-MM-dd'T'HH:mm:ss'Z'";
export const UNIX_TIMESTAMP = 'X';
export const FULL_YEAR = 'y';
export const PREFIXED_MONTH = 'MM';
export const PREFIXED_DAY = 'dd';
export const USA_MM_DD_YYYY_DATE = 'MM/dd/yy';
export const USA_MM_DD_YYYY_DATE_TIME = 'MM/dd/yy HH:mm:ss';

export type DateRange = {
    startDate: Date;
    endDate: Date;
};
