import { type TransactionClause } from '@vechain/sdk-core';
import { type TransactionReceipt } from '@vechain/sdk-network';

/**
 * Defines the signer interface for sending a transaction.
 * @property sendTransaction - Send a transaction with the specified clauses and options.
 */
interface Signer {
    sendTransaction: (
        clauses: ExtendedClause[],
        options?: SendTxOptions
    ) => Promise<SendTxResponse>;
}

/**
 * Defines the extended clause for sending a transaction.
 * @property comment - The comment for the transaction clause.
 * @property abi - The ABI for the transaction clause.
 */
type ExtendedClause = TransactionClause & {
    comment?: string;
    abi?: object;
};

/**
 * Defines the options for sending a transaction.
 * @property signer - Request an account to send the transaction.
 * @property gas - The gas limit for the transaction.
 * @property dependsOn - The transaction hash that this transaction depends on.
 * @property link - The callback URL for the transaction.
 * @property comment - The comment for the transaction.
 * @property delegator - The delegator for the transaction.
 * @property onAccepted - The callback function that is called when the transaction is sent to the wallet.
 */
interface SendTxOptions {
    signer?: string;
    gas?: number;
    dependsOn?: string;
    link?: string;
    comment?: string;
    delegator?: {
        url: string;
        signer?: string;
    };
    onAccepted?: () => void;
}

/**
 * Defines the response for sending a transaction.
 * @property id - The transaction ID.
 * @property signer - The signer for the transaction.
 */
interface SendTxResponse {
    readonly id: string;
    readonly signer: string;
    wait: () => Promise<TransactionReceipt | null>;
}

export type { Signer, SendTxResponse, ExtendedClause, SendTxOptions };
