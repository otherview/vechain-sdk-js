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
import { rpcProxyEndpointTestCases } from './fixture';

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

    test('Should be able to start and stop a new RPC Proxy', (done) => {
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

    test('Should be able to test RPC Proxy Endpoints', (done) => {
        startProxy();

        setTimeout(async () => {
            rpcProxyEndpointTestCases.forEach(async({method, params, expected})=>
            {
                const res = await request(app).post('/').send({
                    method: method,
                    params: params
                });

                // HTTP Response Status Check
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveProperty('result');
                expect(res.body.result).toStrictEqual(expected);
            });

            stopProxy();
            setTimeout(() => done(), 1000);
        }, 100);
    });
});
