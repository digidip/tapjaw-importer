"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const https_1 = (0, tslib_1.__importDefault)(require("https"));
const request_1 = (0, tslib_1.__importDefault)(require("../request"));
const events_1 = require("events");
jest.mock("https");
class MockResponse extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        this.write = jest.fn();
        this.end = jest.fn();
        this.statusCode = 200;
        this.setEncoding = () => ({});
    }
}
describe("Make sure requests() works as expected", () => {
    test("should be able to handle simple JSON string", async () => {
        const spy = jest.spyOn(https_1.default, "request").mockImplementation(
        // @ts-ignore
        (options, callback) => {
            const response = new MockResponse();
            if (callback) {
                callback(response);
            }
            response.emit("data", '{"test":true}');
            response.emit("end");
            return response;
        });
        // tslint:disable-next-line:no-floating-promises
        expect((0, request_1.default)("", {
            host: "test.com"
        })).resolves.toEqual('{"test":true}');
    });
    test("should be able to throw error on non-200 request", () => {
        const spy = jest.spyOn(https_1.default, "request").mockImplementation(
        // @ts-ignore
        (options, callback) => {
            const response = new MockResponse();
            response.statusCode = 404;
            if (callback) {
                callback(response);
            }
            return response;
        });
        // tslint:disable-next-line:no-floating-promises
        expect((0, request_1.default)("", {
            host: "test.com"
        })).rejects.toEqual(new Error("HTTP Status code was 404."));
    });
    test("should throw error when https emits an error", () => {
        const spy = jest.spyOn(https_1.default, "request").mockImplementation(
        // @ts-ignore
        (options, callback) => {
            const response = new MockResponse();
            if (callback) {
                callback(response);
            }
            response.emit("error", new Error("test error"));
            return response;
        });
        // tslint:disable-next-line:no-floating-promises
        expect((0, request_1.default)("", {
            host: "test.com"
        })).rejects.toEqual(new Error("test error"));
    });
});
