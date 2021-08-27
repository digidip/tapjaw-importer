import { Form, InputField } from './html-form-extractor';
import querystring from 'querystring';

export type FormFieldName = string;
export type FormFieldValue = string;

export interface FormRequest {
    data: string;
    length: number;
}

export default class RequestFormBuilder {
    constructor(protected readonly populateFormFields: Map<FormFieldName, FormFieldValue>) {}

    public build(form: Form): FormRequest | never {
        this.validateForm(form);

        const formData: { [key: string]: string; } = {};
        form.inputs.forEach((field: InputField) => {
            if (this.populateFormFields.has(field.name)) {
                // fillable field
                formData[field.name] = this.populateFormFields.get(field.name) as string;
            } else {
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
    private validateForm(form: Form): void | never {
        const properties = new Set(form.inputs.map(input => input.name));

        for (const [fieldName,] of this.populateFormFields) {
            if (!properties.has(fieldName)) {
                throw new Error(`"${fieldName}" does not exist in form.`);
            }
        }
    }
}
