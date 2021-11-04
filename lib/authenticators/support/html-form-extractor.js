"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_html_parser_1 = require("node-html-parser");
class HtmlFormExtractor {
    constructor(formElementSelector, baseUrl) {
        this.formElementSelector = formElementSelector;
        this.baseUrl = baseUrl;
    }
    getInputFields(html) {
        const dom = (0, node_html_parser_1.parse)(html);
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
        const outputForm = {
            url: requestAction,
            method: form.attributes?.method || 'GET',
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
exports.default = HtmlFormExtractor;
