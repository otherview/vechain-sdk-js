import { Quantity } from '@vechain/sdk-core';

const rpcProxyEndpointTestCases = [
    {
        method: 'net_version',
        params: [],
        expected: '0x186aa'
    },
    {
        method: 'eth_chainId',
        params: [],
        expected: '0x186aa'
    },
    {
        method: 'web3_clientVersion',
        params: [],
        expected: 'thor'
    },
    {
        method: 'eth_call',
        params: [
            {
                from: '0x7487d912d03ab9de786278f679592b3730bdd540',
                to: '0x3db469a79593dcc67f07de1869d6682fc1eaf535',
                value: '1000000000000000000',
                data: '0x'
            },
            'latest'
        ],
        expected: '0x'
    },
    {
        method: 'eth_getBlockByNumber',
        params: [Quantity.of(0), false],
        expected: {
            hash: '0x00000000c05a20fbca2bf6ae3affba6af4a74b800b585bf7a4988aba7aea69f6',
            parentHash:
                '0xffffffff00000000000000000000000000000000000000000000000000000000',
            number: '0x0',
            size: '0xaa',
            stateRoot:
                '0x93de0ffb1f33bc0af053abc2a87c4af44594f5dcb1cb879dd823686a15d68550',
            receiptsRoot:
                '0x45b0cfc220ceec5b7c1c62c4d4193d38e4eba48e8815729ce75f9c0ab0e4c1c0',
            transactionsRoot:
                '0x45b0cfc220ceec5b7c1c62c4d4193d38e4eba48e8815729ce75f9c0ab0e4c1c0',
            timestamp: '0x5afb0400',
            gasLimit: '0x989680',
            gasUsed: '0x0',
            transactions: [],
            miner: '0x0000000000000000000000000000000000000000',
            difficulty: '0x0',
            totalDifficulty: '0x0',
            uncles: [],
            sha3Uncles:
                '0x0000000000000000000000000000000000000000000000000000000000000000',
            nonce: '0x0000000000000000',
            logsBloom:
                '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
            extraData: '0x0',
            baseFeePerGas: '0x0',
            mixHash:
                '0x0000000000000000000000000000000000000000000000000000000000000000'
        }
    },
];

export { rpcProxyEndpointTestCases };
