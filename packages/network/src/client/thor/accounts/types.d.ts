/**
 * The account details represent the balance, energy & whether the account is a smart contract.
 */
interface AccountDetail {
    /**
     * The balance of VET of the account.
     */
    balance: string;

    /**
     * The balance of VTHO of the account.
     */
    energy: string;

    /**
     * Whether the account is a smart contract (i.e., hasCode is true)
     */
    hasCode: boolean;
}

/**
 * The bytecode of a smart contract.
 * The bytecode is represented in hex string.
 */
interface ResponseBytecode {
    code: string;
}

/**
 * The storage data of a smart contract at the specified position.
 * The storage data is represented in hex string.
 */
interface ResponseStorage {
    value: string;
}

export type { AccountDetail, ResponseBytecode, ResponseStorage };