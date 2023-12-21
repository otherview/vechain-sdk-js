import {
    HttpClient,
    ThorestClient,
    ThorClient
} from '@vechainfoundation/vechain-sdk-network';
import { expect } from 'expect';

// 1 - Create client for testnet

const _testnetUrl = 'https://testnet.vechain.org';
const testNetwork = new HttpClient(_testnetUrl);
const thorestClient = new ThorestClient(testNetwork);
const thorClient = new ThorClient(thorestClient);

// 2 - Get account details

// Account details
const accountDetails = await thorClient.accounts.getAccount(
    '0x5034aa590125b64023a0262112b98d72e3c8e40e'
);
expect(accountDetails).toBeDefined();

// Account code
const accountCode = await thorClient.accounts.getBytecode(
    '0x5034aa590125b64023a0262112b98d72e3c8e40e'
);
expect(accountCode).toEqual('0x');

// Get account storage
const accountStorage = await thorClient.accounts.getStorageAt(
    '0x5034aa590125b64023a0262112b98d72e3c8e40e',
    '0x0000000000000000000000000000000000000000000000000000000000000001'
);
expect(accountStorage).toEqual(
    '0x0000000000000000000000000000000000000000000000000000000000000000'
);