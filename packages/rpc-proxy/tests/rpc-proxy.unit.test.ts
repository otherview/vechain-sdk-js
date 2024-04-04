import {
    afterEach,
    beforeEach,
    describe,
    expect,
    jest,
    test
} from '@jest/globals';
import { startProxy, stopProxy } from '../src';
import { type SpiedFunction } from 'jest-mock';

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
});
