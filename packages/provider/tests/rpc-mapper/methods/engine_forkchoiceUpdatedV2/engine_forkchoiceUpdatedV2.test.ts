import { afterEach, beforeEach, describe, expect, test } from '@jest/globals';
import { NotImplementedError } from '@vechain/vechain-sdk-errors';
import { RPC_METHODS, RPCMethodsMap } from '../../../../src';
import { ThorClient } from '@vechain/vechain-sdk-network';
import { testNetwork } from '../../../fixture';

/**
 * RPC Mapper integration tests for 'engine_forkchoiceUpdatedV2' method
 *
 * @group integration/rpc-mapper/methods/engine_forkchoiceUpdatedV2
 */
describe('RPC Mapper - engine_forkchoiceUpdatedV2 method tests', () => {
    /**
     * Thor client instance
     */
    let thorClient: ThorClient;

    /**
     * Inti thor client before each test
     */
    beforeEach(() => {
        // Init thor client
        thorClient = new ThorClient(testNetwork);
    });

    /**
     * Destory thor client after each test
     */
    afterEach(() => {
        thorClient.destroy();
    });

    /**
     * engine_forkchoiceUpdatedV2 RPC call tests - Positive cases
     */
    describe('engine_forkchoiceUpdatedV2 - Positive cases', () => {
        /**
         * Positive case 1 - ... Description ...
         */
        test('engine_forkchoiceUpdatedV2 - positive case 1', async () => {
            // NOT IMPLEMENTED YET!
            await expect(
                async () =>
                    await RPCMethodsMap(thorClient)[
                        RPC_METHODS.engine_forkchoiceUpdatedV2
                    ]([-1])
            ).rejects.toThrowError(NotImplementedError);
        });
    });

    /**
     * engine_forkchoiceUpdatedV2 RPC call tests - Negative cases
     */
    describe('engine_forkchoiceUpdatedV2 - Negative cases', () => {
        /**
         * Negative case 1 - ... Description ...
         */
        test('engine_forkchoiceUpdatedV2 - negative case 1', async () => {
            // NOT IMPLEMENTED YET!
            await expect(
                async () =>
                    await RPCMethodsMap(thorClient)[
                        RPC_METHODS.engine_forkchoiceUpdatedV2
                    ](['SOME_RANDOM_PARAM'])
            ).rejects.toThrowError(NotImplementedError);
        });
    });
});