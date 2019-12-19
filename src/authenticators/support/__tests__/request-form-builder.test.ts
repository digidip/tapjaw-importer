import { Form } from "../html-form-extractor";
import RequestFormBuilder, { FormFieldName, FormFieldValue } from '../request-form-builder';
const querystring = require('querystring');

describe('Make sure the RequestFormBuilder works as expected', () => {
    test('Should be able to build a POST request x-www-form-urlencoded body', () => {
        const form: Form = {
            url: 'http://testing.com/sso/login',
            method: 'post',
            inputs: [
                {
                    name: 'lt',
                    value: 'LT-124299922-XXkbY6bVb65WSlsdaXBbyOCFdwrflk',
                    type: 'hidden'
                },
                {
                    name: 'execution',
                    value: 'e1s1',
                    type: 'hidden'
                },
                {
                    name: '_eventId',
                    value: 'submit',
                    type: 'hidden'
                },
                {
                    name: 'HEALTHCHECK',
                    value: 'HEALTHCHECK PASSED.',
                    type: 'hidden'
                },
                {
                    name: 'username',
                    value: '',
                    type: 'text'
                },
                {
                    name: 'password',
                    value: '',
                    type: 'password'
                },
                {
                    name: 'login',
                    value: 'Log In',
                    type: 'submit'
                }
            ]
        };

        const builder = new RequestFormBuilder(new Map<FormFieldName, FormFieldValue>([
            ['username', 'test'],
            ['password', 'test'],
        ]));

        const expectedForm = querystring.stringify({
            lt: 'LT-124299922-XXkbY6bVb65WSlsdaXBbyOCFdwrflk',
            execution: 'e1s1',
            _eventId: 'submit',
            HEALTHCHECK: 'HEALTHCHECK PASSED.',
            username: 'test',
            password: 'test',
            login: 'Log In'
        });

        expect(builder.build(form)).toEqual({
            data: expectedForm,
            length: expectedForm.length
        });
    });

    test('Should throw error when fillable field does not exist', () => {
        const form: Form = {
            url: 'http://testing.com/sso/login',
            method: 'post',
            inputs: [
                {
                    name: 'lt',
                    value: 'LT-124299922-XXkbY6bVb65WSlsdaXBbyOCFdwrflk',
                    type: 'hidden'
                },
                {
                    name: 'execution',
                    value: 'e1s1',
                    type: 'hidden'
                },
                {
                    name: '_eventId',
                    value: 'submit',
                    type: 'hidden'
                },
                {
                    name: 'HEALTHCHECK',
                    value: 'HEALTHCHECK PASSED.',
                    type: 'hidden'
                },
                {
                    name: 'username',
                    value: '',
                    type: 'text'
                },
                {
                    name: 'password',
                    value: '',
                    type: 'password'
                },
                {
                    name: 'login',
                    value: 'Log In',
                    type: 'submit'
                }
            ]
        };

        const builder = new RequestFormBuilder(new Map<FormFieldName, FormFieldValue>([
            ['username', 'test'],
            ['moose', 'test'],
        ]));

        expect(() => builder.build(form)).toThrowError(new Error('"moose" does not exist in form.'));
    });
});
