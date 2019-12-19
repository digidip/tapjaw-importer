"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const querystring = require('querystring');
class RequestFormBuilder {
    constructor(populateFormFields) {
        this.populateFormFields = populateFormFields;
    }
    build(form) {
        this.validateForm(form);
        const formData = {};
        form.inputs.forEach((field) => {
            if (this.populateFormFields.has(field.name)) {
                // fillable field
                formData[field.name] = this.populateFormFields.get(field.name);
            }
            else {
                // aux field
                formData[field.name] = field.value;
            }
        });
        const queryData = querystring.stringify(formData);
        return {
            data: queryData,
            length: queryData.length
        };
    }
    /**
     * Make sure that the populateFormFiels exist in the Form.
     *
     * @param form Form
     */
    validateForm(form) {
        const properties = new Set(form.inputs.map(input => input.name));
        for (const [fieldName, fieldValue] of this.populateFormFields) {
            if (!properties.has(fieldName)) {
                throw new Error(`"${fieldName}" does not exist in form.`);
            }
        }
    }
}
exports.default = RequestFormBuilder;
