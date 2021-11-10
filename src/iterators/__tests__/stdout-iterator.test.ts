// Add custom configs
process.env.TAPJAW_MESSAGE_SHA256_SECRET = 'TestingSecet';

import StdoutIterator from '../stdout-iterator';
import TapjawMessage from '../../messages/tapjaw-message';
jest.mock('process');

describe('Make sure the iterator operates as expected', () => {
    test('should output 5 STDOUT calls', async () => {
        let stdoutOutput: (string | Uint8Array)[] = [];
        const spy = jest.spyOn(process.stdout, 'write').mockImplementation((msg: string | Uint8Array) => {
            stdoutOutput.push(msg);
            return true;
        });

        const iterator = new StdoutIterator(process.stdout);
        async function* callback(): AsyncGenerator<TapjawMessage> {
            yield new TapjawMessage('test1', { name: 'test1' }, new Date('2019-01-01'));
            yield new TapjawMessage('test2', { name: 'test2' }, new Date('2019-01-01'));
            yield new TapjawMessage('test3', { name: 'test3' }, new Date('2019-01-01'));
            yield new TapjawMessage('test4', { name: 'test4' }, new Date('2019-01-01'));
            yield new TapjawMessage('test5', { name: 'test5' }, new Date('2019-01-01'));
        }

        await iterator.run(callback);
        expect(spy).toBeCalledTimes(5);
        expect(stdoutOutput).toMatchSnapshot();
    });

    test('should throw an error when JSON error occurs', async () => {
        const spy = jest
            .spyOn(JSON, 'stringify')
            .mockImplementation(
                (
                    value: any,
                    replacer?: (string | number)[] | null | undefined,
                    space?: string | number | undefined
                ): string => {
                    return '';
                }
            );

        const iterator = new StdoutIterator(process.stdout);
        async function* callback(): AsyncGenerator<TapjawMessage> {
            yield new TapjawMessage('test1', { name: 'test1' }, new Date('2019-01-01'));
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
            .mockImplementation(
                (
                    value: any,
                    replacer?: (string | number)[] | null | undefined,
                    space?: string | number | undefined
                ): string => {
                    return '{}';
                }
            );

        const iterator = new StdoutIterator(process.stdout);

        const tapMessage = new TapjawMessage('test1', { name: 'test1' }, new Date('2019-01-01'));
        async function* callback(): AsyncGenerator<TapjawMessage> {
            yield tapMessage;
        }

        await iterator.run(callback);
        expect(spy).toBeCalledWith(tapMessage, null, undefined);

        iterator.setPretty(true);
        await iterator.run(callback);
        expect(spy).toBeCalledWith(tapMessage, null, 2);
    });
});
