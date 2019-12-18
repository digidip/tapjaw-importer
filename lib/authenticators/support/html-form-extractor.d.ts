import { Method } from 'axios';
export interface InputField {
    name: string;
    value: string;
    type: string;
}
export interface Form {
    url: string | false;
    method: Method;
    inputs: InputField[];
}
export default class HtmlFormExtractor {
    protected readonly formElementSelector: string;
    protected readonly baseUrl: string;
    constructor(formElementSelector: string, baseUrl: string);
    getInputFields(html: string): Form | null;
}
