import {
    afterEach,
    beforeEach,
    describe,
    expect,
    jest,
    test
} from '@jest/globals';
import { app, startProxy, stopProxy } from '../src';
import { type SpiedFunction } from 'jest-mock';
import request from 'supertest';

/**
 * RPC Proxy tests
 *
 * @group unit/rpc-proxy
 */
describe('RPC Proxy', () => {
    let logSpy: SpiedFunction<{
        (...data: never[]): void;
        (message?: never, ...optionalParams: never[]): void;
    }>;

    beforeEach(() => {
        logSpy = jest.spyOn(console, 'log');
        logSpy.mockImplementation(() => {});
    });

    afterEach(() => {
        logSpy.mockRestore();
    });

    test('Should be able to start a new RPC Proxy', (done) => {
        startProxy();

        setTimeout(() => {
            expect(logSpy).toHaveBeenCalledWith(
                '[rpc-proxy]: Starting proxy on port 8545'
            );
            expect(logSpy).toHaveBeenCalledWith(
                '[rpc-proxy]: Proxy is running on port 8545'
            );
            stopProxy();
            done();
        }, 100);
    });

    test('Should be able to start a new RPC Proxy', (done) => {
        startProxy();

        setTimeout(async () => {
            const res = await request(app).post('/').send({
                method: 'web3_clientVersion',
                params: []
            });
            // HTTP Response Status Check
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('result');
            expect(typeof res.body.result).toBe('string');

            stopProxy();

            setTimeout(() => done(), 1000);
        }, 100);
    });

    // test('Should return version information', async () => {
    //     startProxy();
    //     setTimeout(async () => {
    //         const res = await request(app).post('/').send({
    //             method: 'web3_clientVersion',
    //             params: []
    //         });
    //
    //         // HTTP Response Status Check
    //         expect(res.statusCode).toEqual(200);
    //
    //         // Typically you'd check the response data structure here
    //         // and probably some values too. This depends on your application.
    //         expect(res.body).toHaveProperty('result');
    //         expect(typeof res.body.result).toBe('string'); // Assuming result is a string, adjust as necessary
    //         stopProxy();
    //     }, 1000);
    // });
});
