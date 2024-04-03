import {
    afterEach,
    beforeEach,
    describe,
    expect,
    jest,
    test
} from '@jest/globals';
import { startProxy, stopProxy } from '../src';
/**
 * RPC Proxy tests
 *
 * @group unit/rpc-proxy
 */
describe('RPC Proxy tests', () => {
    // Mocking console.log and console.error to prevent output during tests
    const originalLog = console.log;
    const originalError = console.error;

    beforeEach(() => {
        console.log = jest.fn();
        console.error = jest.fn();
    });
    afterEach(() => {
        console.log = originalLog;
        console.error = originalError;
    });

    test('Should be able to create a new RPC Proxy', () => {
        startProxy(); // Call the startProxy function

        // Expect console.log to be called with the correct message
        expect(console.log).toHaveBeenCalledWith(
            '[rpc-proxy]: Starting proxy on port 8545'
        );

        stopProxy();
        // Expect console.log to be called with the stop message
        expect(console.log).toHaveBeenCalledWith(
            '[rpc-proxy]: Proxy server stopped'
        );
    });
});
