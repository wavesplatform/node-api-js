export const TYPE_MAP = {
    3: 'issue' as 'issue',
    4: 'transfer' as 'transfer',
    5: 'reissue' as 'reissue',
    6: 'burn' as 'burn',
    7: 'exchange' as 'exchange',
    8: 'lease' as 'lease',
    9: 'cancelLease' as 'cancelLease',
    10: 'alias' as 'alias',
    11: 'massTransfer' as 'massTransfer',
    12: 'data' as 'data',
    13: 'setScript' as 'setScript',
    14: 'sponsorship' as 'sponsorship',
    15: 'setAssetScript' as 'setAssetScript',
    16: 'invoke' as 'invoke',
    17: 'updateAsset' as 'updateAsset'
};

export const NAME_MAP = {
    'issue': 3 as 3,
    'transfer': 4 as 4,
    'reissue': 5 as 5,
    'burn': 6 as 6,
    'exchange': 7 as 7,
    'lease': 8 as 8,
    'cancelLease': 9 as 9,
    'alias': 10 as 10,
    'massTransfer': 11 as 11,
    'data': 12 as 12,
    'setScript': 13 as 13,
    'sponsorship': 14 as 14,
    'setAssetScript': 15 as 15,
    'invoke': 16 as 16,
    'updateAsset': 17 as 17
};

export const TRANSACTION_STATUSES = {
    IN_BLOCKCHAIN: 'in_blockchain' as 'in_blockchain',
    UNCONFIRMED: 'unconfirmed' as 'unconfirmed',
    NOT_FOUND: 'not_found' as 'not_found'
};

export type TTransactionStatuses = typeof TRANSACTION_STATUSES[keyof typeof TRANSACTION_STATUSES];
