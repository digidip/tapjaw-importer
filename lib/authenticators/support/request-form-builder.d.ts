import { Form } from './html-form-extractor';
export declare type FormFieldName = string;
export declare type FormFieldValue = string;
export interface FormRequest {
    data: string;
    length: number;
}
export default class RequestFormBuilder {
    protected readonly populateFormFields: Map<FormFieldName, FormFieldValue>;
    constructor(populateFormFields: Map<FormFieldName, FormFieldValue>);
    build(form: Form): FormRequest | never;
    /**
     * Make sure that the populateFormFiels exist in the Form.
     *
     * @param form Form
     */
    private validateForm;
}
