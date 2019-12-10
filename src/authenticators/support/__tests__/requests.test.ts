import * as https from "https";
import request from "../request";
import { IncomingMessage, RequestOptions } from "http";
import { EventEmitter } from "events";
jest.mock("https");

class MockResponse extends EventEmitter
    implements Pick<IncomingMessage, "statusCode" | "setEncoding"> {
    write = jest.fn();
    end = jest.fn();
    statusCode = 200;
    setEncoding = (): IncomingMessage => ({} as IncomingMessage);
}

describe("Make sure requests() works as expected", () => {
    test("should be able to handle simple JSON string", async () => {
        const spy = jest.spyOn(https, "request").mockImplementation(
            // @ts-ignore
            (
                options: RequestOptions,
                callback?: (res: IncomingMessage) => void
            ): any => {
                const response = new MockResponse();

                if (callback) {
                    callback(response as any);
                }

                response.emit("data", '{"test":true}');
                response.emit("end");

                return response;
            }
        );

        // tslint:disable-next-line:no-floating-promises
        expect(
            request("", {
                host: "test.com"
            })
        ).resolves.toEqual('{"test":true}');
    });

    test("should be able to throw error on non-200 request", () => {
        const spy = jest.spyOn(https, "request").mockImplementation(
            // @ts-ignore
            (
                options: RequestOptions,
                callback?: (res: IncomingMessage) => void
            ): any => {
                const response = new MockResponse();
                response.statusCode = 404;

                if (callback) {
                    callback(response as any);
                }

                return response;
            }
        );

        // tslint:disable-next-line:no-floating-promises
        expect(
            request("", {
                host: "test.com"
            })
        ).rejects.toEqual(new Error("HTTP Status code was 404."));
    });

    test("should throw error when https emits an error", () => {
        const spy = jest.spyOn(https, "request").mockImplementation(
            // @ts-ignore
            (
                options: RequestOptions,
                callback?: (res: IncomingMessage) => void
            ): any => {
                const response = new MockResponse();

                if (callback) {
                    callback(response as any);
                }

                response.emit("error", new Error("test error"));

                return response;
            }
        );

        // tslint:disable-next-line:no-floating-promises
        expect(
            request("", {
                host: "test.com"
            })
        ).rejects.toEqual(new Error("test error"));
    });
});
