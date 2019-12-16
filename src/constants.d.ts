export declare const TYPE_MAP: {
    3: "issue";
    4: "transfer";
    5: "reissue";
    6: "burn";
    7: "exchange";
    8: "lease";
    9: "cancelLease";
    10: "alias";
    11: "massTransfer";
    12: "data";
    13: "setScript";
    14: "sponsorship";
    15: "setAssetScript";
    16: "invoke";
};
export declare const NAME_MAP: {
    'issue': 3;
    'transfer': 4;
    'reissue': 5;
    'burn': 6;
    'exchange': 7;
    'lease': 8;
    'cancelLease': 9;
    'alias': 10;
    'massTransfer': 11;
    'data': 12;
    'setScript': 13;
    'sponsorship': 14;
    'setAssetScript': 15;
    'invoke': 16;
};
export declare const TRANSACTION_STATUSES: {
    IN_BLOCKCHAIN: "in_blockchain";
    UNCONFIRMED: "unconfirmed";
    NOT_FOUND: "not_found";
};
export declare type TTransactionStatuses = typeof TRANSACTION_STATUSES[keyof typeof TRANSACTION_STATUSES];
