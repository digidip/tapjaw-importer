"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// Add custom configs
process.env.TAPJAW_MESSAGE_SHA256_SECRET = 'TestingSecet';
const stdout_iterator_1 = (0, tslib_1.__importDefault)(require("../stdout-iterator"));
const tapjaw_message_1 = (0, tslib_1.__importDefault)(require("../../messages/tapjaw-message"));
jest.mock('process');
describe('Make sure the iterator operates as expected', () => {
    test('should output 5 STDOUT calls', async () => {
        let stdoutOutput = [];
        const spy = jest.spyOn(process.stdout, 'write').mockImplementation((msg) => {
            stdoutOutput.push(msg);
            return true;
        });
        const iterator = new stdout_iterator_1.default(process.stdout);
        async function* callback() {
            yield new tapjaw_message_1.default('test1', { name: 'test1' }, new Date('2019-01-01'));
            yield new tapjaw_message_1.default('test2', { name: 'test2' }, new Date('2019-01-01'));
            yield new tapjaw_message_1.default('test3', { name: 'test3' }, new Date('2019-01-01'));
            yield new tapjaw_message_1.default('test4', { name: 'test4' }, new Date('2019-01-01'));
            yield new tapjaw_message_1.default('test5', { name: 'test5' }, new Date('2019-01-01'));
        }
        await iterator.run(callback);
        expect(spy).toBeCalledTimes(5);
        expect(stdoutOutput).toMatchSnapshot();
    });
    test('should throw an error when JSON error occurs', async () => {
        const spy = jest
            .spyOn(JSON, 'stringify')
            .mockImplementation((value, replacer, space) => {
            return '';
        });
        const iterator = new stdout_iterator_1.default(process.stdout);
        async function* callback() {
            yield new tapjaw_message_1.default('test1', { name: 'test1' }, new Date('2019-01-01'));
        }
        expect(iterator.run(callback))
            .rejects.toThrow('message could not be parsed into JSON.')
            .finally(() => {
            expect(spy).toBeCalled();
        });
    });
    test('should set pretty', async () => {
        const spy = jest
            .spyOn(JSON, 'stringify')
            .mockImplementation((value, replacer, space) => {
            return '{}';
        });
        const iterator = new stdout_iterator_1.default(process.stdout);
        const tapMessage = new tapjaw_message_1.default('test1', { name: 'test1' }, new Date('2019-01-01'));
        async function* callback() {
            yield tapMessage;
        }
        await iterator.run(callback);
        expect(spy).toBeCalledWith(tapMessage, null, undefined);
        iterator.setPretty(true);
        await iterator.run(callback);
        expect(spy).toBeCalledWith(tapMessage, null, 2);
    });
});
