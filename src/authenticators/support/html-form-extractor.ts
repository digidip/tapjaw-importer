import { parse, HTMLElement } from 'node-html-parser';
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
    public constructor(
        protected readonly formElementSelector: string,
        protected readonly baseUrl: string
    ) {}

    public getInputFields(html: string): Form | null {
        const dom = parse(html) as HTMLElement;
        const form = dom.querySelector(this.formElementSelector);

        if (!form) {
            return null;
        }

        let requestAction = form.attributes?.action || false;
        if (requestAction) {
            if (!requestAction.startsWith('http') && this.baseUrl) {
                requestAction = this.baseUrl + (requestAction.startsWith('/') ? requestAction : '/' + requestAction);
            }
        }

        const outputForm: Form = {
            url: requestAction,
            method: form.attributes?.method as Method || 'GET',
            inputs: []
        };

        const inputs = form.querySelectorAll('input');
        if (!inputs) {
            return null;
        }

        inputs.forEach(element => {
            outputForm.inputs.push({
                name: element.attributes?.name || '',
                value: element.attributes?.value || '',
                type: element.attributes?.type || '',
            });
        });

        return outputForm;
    }
}
