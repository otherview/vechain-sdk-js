import { beforeEach, describe, expect, test } from '@jest/globals';
import { NotImplementedError } from '@vechain/sdk-errors';
import { RPC_METHODS, RPCMethodsMap, ThorClient } from '../../../../../src';
import { testnetUrl } from '../../../../fixture';

/**
 * RPC Mapper integration tests for 'eth_hashrate' method
 *
 * @group integration/rpc-mapper/methods/eth_hashrate
 */
describe('RPC Mapper - eth_hashrate method tests', () => {
    /**
     * Thor client instance
     */
    let thorClient: ThorClient;

    /**
     * Init thor client before each test
     */
    beforeEach(() => {
        // Init thor client
        thorClient = ThorClient.fromUrl(testnetUrl);
    });

    /**
     * eth_hashrate RPC call tests - Positive cases
     */
    describe('eth_hashrate - Positive cases', () => {
        /**
         * Positive case 1 - ... Description ...
         */
        test('eth_hashrate - positive case 1', async () => {
            // NOT IMPLEMENTED YET!
            await expect(
                async () =>
                    await RPCMethodsMap(thorClient)[RPC_METHODS.eth_hashrate]([
                        -1
                    ])
            ).rejects.toThrowError(NotImplementedError);
        });
    });

    /**
     * eth_hashrate RPC call tests - Negative cases
     */
    describe('eth_hashrate - Negative cases', () => {
        /**
         * Negative case 1 - ... Description ...
         */
        test('eth_hashrate - negative case 1', async () => {
            // NOT IMPLEMENTED YET!
            await expect(
                async () =>
                    await RPCMethodsMap(thorClient)[RPC_METHODS.eth_hashrate]([
                        'SOME_RANDOM_PARAM'
                    ])
            ).rejects.toThrowError(NotImplementedError);
        });
    });
});
