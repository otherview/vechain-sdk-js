import {
    coder,
    networkInfo,
    type TransactionBody,
    unitsUtils
} from '@vechain/sdk-core';
import { BUILT_IN_CONTRACTS } from '../../built-in-fixture';
import {
    TEST_ACCOUNTS,
    TESTING_CONTRACT_ABI,
    TESTING_CONTRACT_ADDRESS
} from '../../fixture';

/**
 * Some random transaction nonces to use into tests
 */
const transactionNonces = {
    waitForTransactionTestCases: [10000000, 10000001, 10000002, 10000003],
    sendTransactionWithANumberAsValueInTransactionBody: [10000004],
    invalidWaitForTransactionTestCases: [10000005],
    shouldThrowErrorIfTransactionIsntSigned: [10000006]
};

/**
 * Clause to transfer 1 VTHO to TEST_ACCOUNTS.TRANSACTION.TRANSACTION_RECEIVER
 */
const transfer1VTHOClause = {
    to: BUILT_IN_CONTRACTS.ENERGY_ADDRESS,
    value: '0',
    data: coder.encodeFunctionInput(BUILT_IN_CONTRACTS.ENERGY_ABI, 'transfer', [
        TEST_ACCOUNTS.TRANSACTION.TRANSACTION_RECEIVER.address,
        unitsUtils.parseVET('1')
    ])
};

/**
 * Clause to transfer 1 VTHO to TEST_ACCOUNTS.TRANSACTION.TRANSACTION_RECEIVER
 */
const transfer1VTHOClauseWithValueAsANumber = {
    to: BUILT_IN_CONTRACTS.ENERGY_ADDRESS,
    value: 0,
    data: coder.encodeFunctionInput(BUILT_IN_CONTRACTS.ENERGY_ABI, 'transfer', [
        TEST_ACCOUNTS.TRANSACTION.TRANSACTION_RECEIVER.address,
        unitsUtils.parseVET('1')
    ])
};

/**
 * transaction body that transfers 1 VTHO to TEST_ACCOUNTS.TRANSACTION.TRANSACTION_RECEIVER
 */
const transferTransactionBody: Omit<TransactionBody, 'gas' | 'nonce'> = {
    clauses: [transfer1VTHOClause],
    chainTag: networkInfo.solo.chainTag,
    blockRef: networkInfo.solo.genesisBlock.id.slice(0, 18),
    expiration: 1000,
    gasPriceCoef: 128,
    dependsOn: null
};

/**
 * transaction body that transfers 1 VTHO to TEST_ACCOUNTS.TRANSACTION.TRANSACTION_RECEIVER
 */
const transferTransactionBodyValueAsNumber: Omit<
    TransactionBody,
    'gas' | 'nonce'
> = {
    clauses: [transfer1VTHOClauseWithValueAsANumber],
    chainTag: networkInfo.solo.chainTag,
    blockRef: networkInfo.solo.genesisBlock.id.slice(0, 18),
    expiration: 1000,
    gasPriceCoef: 128,
    dependsOn: null
};

/**
 * Expected transaction receipt values.
 * Note that this object is not a valid `TransactionReceipt` object.
 */
const expectedReceipt = {
    events: [],
    gasPayer: '0x2669514f9fe96bc7301177ba774d3da8a06cace4',
    gasUsed: 36518,
    outputs: [
        {
            contractAddress: null,
            events: [
                {
                    address: '0x0000000000000000000000000000456e65726779',
                    data: '0x0000000000000000000000000000000000000000000000000de0b6b3a7640000',
                    topics: [
                        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
                        '0x0000000000000000000000002669514f9fe96bc7301177ba774d3da8a06cace4',
                        '0x0000000000000000000000009e7911de289c3c856ce7f421034f66b6cde49c39'
                    ]
                }
            ],
            transfers: []
        }
    ],
    reverted: false
};

/**
 * waitForTransaction test cases that should return a transaction receipt
 */
const waitForTransactionTestCases = [
    {
        description:
            'Should wait for transaction without timeout and return TransactionReceipt',
        options: {
            timeoutMs: undefined,
            intervalMs: undefined,
            nonce: transactionNonces.waitForTransactionTestCases[0]
        }
    },
    {
        description:
            'Should wait for transaction with timeout and return TransactionReceipt',
        options: {
            timeoutMs: 5000,
            intervalMs: undefined,
            nonce: transactionNonces.waitForTransactionTestCases[1]
        }
    },
    {
        description:
            'Should wait for transaction with intervalMs TransactionReceipt',
        options: {
            timeoutMs: undefined,
            intervalMs: 100,
            nonce: transactionNonces.waitForTransactionTestCases[2]
        }
    },
    {
        description:
            'Should wait for transaction with intervalMs & timeoutMs and return TransactionReceipt',
        options: {
            timeoutMs: 5000,
            intervalMs: 100,
            nonce: transactionNonces.waitForTransactionTestCases[3]
        }
    }
];

/**
 * waitForTransaction test cases that should not return a transaction receipt. Instead, should return null.
 */
const invalidWaitForTransactionTestCases = [
    {
        description: 'Should throw error when timeoutMs is too low',
        options: {
            timeoutMs: 1,
            intervalMs: undefined,
            nonce: transactionNonces.invalidWaitForTransactionTestCases[0]
        }
    }
];

/**
 * buildTransactionBody test cases
 */
const buildTransactionBodyClausesTestCases = [
    {
        description: 'Should build transaction body that transfers 1 VTHO',
        clauses: [transfer1VTHOClause],
        options: {},
        expected: {
            solo: {
                chainTag: 246,
                clauses: [
                    {
                        data: '0xa9059cbb0000000000000000000000009e7911de289c3c856ce7f421034f66b6cde49c390000000000000000000000000000000000000000000000000de0b6b3a7640000',
                        to: '0x0000000000000000000000000000456e65726779',
                        value: '0'
                    }
                ],
                dependsOn: null,
                expiration: 32,
                gas: 51518,
                gasPriceCoef: 0,
                reserved: undefined
            },
            testnet: {
                chainTag: 39,
                clauses: [
                    {
                        data: '0xa9059cbb0000000000000000000000009e7911de289c3c856ce7f421034f66b6cde49c390000000000000000000000000000000000000000000000000de0b6b3a7640000',
                        to: '0x0000000000000000000000000000456e65726779',
                        value: '0'
                    }
                ],
                dependsOn: null,
                expiration: 32,
                gas: 39263,
                gasPriceCoef: 0,
                reserved: undefined
            }
        }
    },
    {
        description:
            'Should build transaction that executes many clauses and all options',
        clauses: [
            transfer1VTHOClause,
            transfer1VTHOClause,
            {
                to: TESTING_CONTRACT_ADDRESS,
                value: '0',
                data: coder.encodeFunctionInput(
                    TESTING_CONTRACT_ABI,
                    'testAssertError',
                    [0] // Any number !== 0 will cause Panic error
                )
            },
            {
                to: TEST_ACCOUNTS.TRANSACTION.TRANSACTION_RECEIVER.address,
                value: unitsUtils.parseVET('1').toString(),
                data: '0x'
            }
        ],
        options: {
            gasPriceCoef: 255,
            expiration: 1000,
            isDelegated: true,
            dependsOn:
                '0x9140e36f05000508465fd55d70947b99a78c84b3afa5e068b955e366b560935f' // Any valid tx id
        },
        expected: {
            solo: {
                chainTag: 246,
                clauses: [
                    {
                        data: '0xa9059cbb0000000000000000000000009e7911de289c3c856ce7f421034f66b6cde49c390000000000000000000000000000000000000000000000000de0b6b3a7640000',
                        to: '0x0000000000000000000000000000456e65726779',
                        value: '0'
                    },
                    {
                        data: '0xa9059cbb0000000000000000000000009e7911de289c3c856ce7f421034f66b6cde49c390000000000000000000000000000000000000000000000000de0b6b3a7640000',
                        to: '0x0000000000000000000000000000456e65726779',
                        value: '0'
                    },
                    {
                        data: '0xc7bce69d0000000000000000000000000000000000000000000000000000000000000000',
                        to: '0xb2c20a6de401003a671659b10629eb82ff254fb8',
                        value: '0'
                    },
                    {
                        data: '0x',
                        to: '0x9e7911de289c3c856ce7f421034f66b6cde49c39',
                        value: '1000000000000000000'
                    }
                ],
                dependsOn:
                    '0x9140e36f05000508465fd55d70947b99a78c84b3afa5e068b955e366b560935f',
                expiration: 1000,
                gas: 115954,
                gasPriceCoef: 255,
                reserved: { features: 1 }
            },
            testnet: {
                chainTag: 39,
                clauses: [
                    {
                        data: '0xa9059cbb0000000000000000000000009e7911de289c3c856ce7f421034f66b6cde49c390000000000000000000000000000000000000000000000000de0b6b3a7640000',
                        to: '0x0000000000000000000000000000456e65726779',
                        value: '0'
                    },
                    {
                        data: '0xa9059cbb0000000000000000000000009e7911de289c3c856ce7f421034f66b6cde49c390000000000000000000000000000000000000000000000000de0b6b3a7640000',
                        to: '0x0000000000000000000000000000456e65726779',
                        value: '0'
                    },
                    {
                        data: '0xc7bce69d0000000000000000000000000000000000000000000000000000000000000000',
                        to: '0xb2c20a6de401003a671659b10629eb82ff254fb8',
                        value: '0'
                    },
                    {
                        data: '0x',
                        to: '0x9e7911de289c3c856ce7f421034f66b6cde49c39',
                        value: '1000000000000000000'
                    }
                ],
                dependsOn:
                    '0x9140e36f05000508465fd55d70947b99a78c84b3afa5e068b955e366b560935f',
                expiration: 1000,
                gas: 89855,
                gasPriceCoef: 255,
                reserved: { features: 1 }
            }
        }
    }
];

export {
    transactionNonces,
    waitForTransactionTestCases,
    invalidWaitForTransactionTestCases,
    transferTransactionBody,
    transferTransactionBodyValueAsNumber,
    expectedReceipt,
    transfer1VTHOClause,
    buildTransactionBodyClausesTestCases
};
