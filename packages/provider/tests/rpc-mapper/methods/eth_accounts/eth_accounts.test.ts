import { afterEach, beforeEach, describe, expect, test } from '@jest/globals';
import { RPC_METHODS, RPCMethodsMap } from '../../../../src';
import { ThorClient } from '@vechain/vechain-sdk-network';
import { testNetwork, THOR_SOLO_ACCOUNTS_BASE_WALLET } from '../../../fixture';
import { type Wallet } from '@vechain/vechain-sdk-wallet';

/**
 * RPC Mapper integration tests for 'eth_accounts' method
 *
 * @group integration/rpc-mapper/methods/eth_accounts
 */
describe('RPC Mapper - eth_accounts method tests', () => {
    /**
     * Thor client instance
     */
    let thorClient: ThorClient;

    /**
     * Init thor client before each test
     */
    beforeEach(() => {
        // Init thor client
        thorClient = new ThorClient(testNetwork);
    });

    /**
     * Destroy thor client after each test
     */
    afterEach(() => {
        thorClient.destroy();
    });

    /**
     * eth_accounts RPC call tests - Positive cases
     */
    describe('eth_accounts - Positive cases', () => {
        /**
         * Positive case 1 - Should be able to get addresses from a NON-empty wallet
         */
        test('eth_accounts - Should be able to get addresses from a NON-empty wallet', async () => {
            // Get accounts
            const accounts = (await RPCMethodsMap(
                thorClient,
                undefined,
                THOR_SOLO_ACCOUNTS_BASE_WALLET as Wallet
            )[RPC_METHODS.eth_accounts]([])) as string[];

            // Check if the accounts are the same
            expect(accounts.length).toBeGreaterThan(0);
            expect(accounts).toEqual(
                THOR_SOLO_ACCOUNTS_BASE_WALLET.accounts.map(
                    (account) => account.address
                )
            );
        });
    });

    /**
     * eth_accounts RPC call tests - Negative cases
     */
    describe('eth_accounts - Negative cases', () => {
        /**
         * Negative case 1 - Should return empty array if wallet is not given
         */
        test('eth_accounts - Should return empty array if wallet is not given', async () => {
            // Get accounts (NO WALLET GIVEN)
            const accounts = (await RPCMethodsMap(thorClient)[
                RPC_METHODS.eth_accounts
            ]([])) as string[];

            // Check if the accounts are the same
            expect(accounts.length).toBe(0);
            expect(accounts).toEqual([]);
        });
    });
});
