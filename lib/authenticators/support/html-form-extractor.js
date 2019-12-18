"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_html_parser_1 = require("node-html-parser");
class HtmlFormExtractor {
    constructor(formElementSelector, baseUrl) {
        this.formElementSelector = formElementSelector;
        this.baseUrl = baseUrl;
    }
    getInputFields(html) {
        var _a, _b;
        const dom = node_html_parser_1.parse(html);
        const form = dom.querySelector(this.formElementSelector);
        if (!form) {
            return null;
        }
        let requestAction = ((_a = form.attributes) === null || _a === void 0 ? void 0 : _a.action) || false;
        if (requestAction) {
            if (!requestAction.startsWith('http') && this.baseUrl) {
                requestAction = this.baseUrl + (requestAction.startsWith('/') ? requestAction : '/' + requestAction);
            }
        }
        const outputForm = {
            url: requestAction,
            method: ((_b = form.attributes) === null || _b === void 0 ? void 0 : _b.method) || 'GET',
            inputs: []
        };
        const inputs = form.querySelectorAll('input');
        if (!inputs) {
            return null;
        }
        inputs.forEach(element => {
            var _a, _b, _c;
            outputForm.inputs.push({
                name: ((_a = element.attributes) === null || _a === void 0 ? void 0 : _a.name) || '',
                value: ((_b = element.attributes) === null || _b === void 0 ? void 0 : _b.value) || '',
                type: ((_c = element.attributes) === null || _c === void 0 ? void 0 : _c.type) || '',
            });
        });
        return outputForm;
    }
}
exports.default = HtmlFormExtractor;
