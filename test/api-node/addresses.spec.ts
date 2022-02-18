import {MASTER_ACCOUNT, NODE_URL, STATE} from '../_state';
import {create} from '../../src';
import {IScriptInfo, fetchScriptInfo} from '../../src/api-node/addresses';
import {isNullableStringOrNumber, isStringOrNumber} from '../extendedMatcher'
import {HeadersInit} from "node-fetch";
import {RequestInit} from "../../src/tools/request";


const api: ReturnType<typeof create> = create(NODE_URL);
const largeNumbeConvertHeader = { headers: {'Accept': 'application/json;large-significand-format=string' }};

const checkSmartAccount = (info: IScriptInfo, address: string) => {
    expect(info.address).toBe(address);
    expect(typeof info.complexity).toBe('number');
    expect(typeof info.verifierComplexity).toBe('number');
    expect(typeof info.callableComplexities).toBe('object');
    expect(info.extraFee).toBe(0.004 * Math.pow(10, 8));
    expect(typeof info.script).toBe('string');
    expect(typeof info.scriptText).toBe('string');
};

const checkNotSmart = (info: IScriptInfo, address: string) => {
    expect(info.address).toBe(address);
    expect(typeof info.complexity).toBe('number');
    expect(info.extraFee).toBe(0);
    expect(info.script).toBe(null);
    expect(info.scriptText).toBe(null);
};

it('Script info smart', async () => {
    const info = await fetchScriptInfo(NODE_URL, STATE.ACCOUNTS.SMART.address);
    checkSmartAccount(info, STATE.ACCOUNTS.SMART.address);
});

it('Script info simple', async () => {
    const info = await api.addresses.fetchScriptInfo(STATE.ACCOUNTS.SIMPLE.address);
    checkNotSmart(info, STATE.ACCOUNTS.SIMPLE.address);
});

it('data by key', async () => {
    const data = await api.addresses.fetchDataKey(STATE.ACCOUNTS.SIMPLE.address, 'key');
    // @ts-ignore
    expect(data.type).toBe(STATE.ACCOUNTS.SIMPLE.data.key.type);
    // @ts-ignore
    expect(data.value).toBe(STATE.ACCOUNTS.SIMPLE.data.key.value);
});

it('data by address', async () => { //AB
     const addressData = await api.addresses.data(STATE.ACCOUNTS.SIMPLE.address);
     console.log(addressData)

     expect(addressData).toBeInstanceOf(Array)

     // @ts-ignore
    let l = addressData.length;
     for(let i=0;i<l;i++) {
         expect(typeof addressData[i].type).toBe('string');
         expect(typeof addressData[i].key).toBe('string');
         expect(typeof addressData[i].value).isStringOrNumber();
     }
     //expect(addressData.).toBe(STATE.ACCOUNTS.SIMPLE.data.key.type);
     /*
     // @ts-ignore
     expect(data.value).toBe(STATE.ACCOUNTS.SIMPLE.data.key.value);

 */
});

it('Script info meta', async () => {
    const info = await api.addresses.fetchScriptInfoMeta(STATE.ACCOUNTS.SIMPLE.address);
    expect(info.meta).toBe(undefined);
});

it('balance details', async () => {
    const {address} = STATE.ACCOUNTS.SIMPLE;
    const balanceDetails = await api.addresses.fetchBalanceDetails(address, );

    expect(balanceDetails.address).toBe(address);
    expect(typeof balanceDetails.regular).isStringOrNumber();
    expect(typeof balanceDetails.generating).isStringOrNumber();
    expect(typeof balanceDetails.available).isStringOrNumber();
    expect(typeof balanceDetails.effective).isStringOrNumber();
});

it('balance details, long as string', async () => {
    const {address} = STATE.ACCOUNTS.SIMPLE;

    const balanceDetails = await api.addresses.fetchBalanceDetails(address, largeNumbeConvertHeader);

    expect(balanceDetails.address).toBe(address);
    expect(typeof balanceDetails.regular).toBe('string');
    expect(typeof balanceDetails.generating).toBe('string');
    expect(typeof balanceDetails.available).toBe('string');
    expect(typeof balanceDetails.effective).toBe('string');
});

it('balance confirmations', async () => {
    const {address} = STATE.ACCOUNTS.SIMPLE;
    const confirmations = 3;
    const balanceConfirmations = await api.addresses.fetchBalanceConfirmations(address, confirmations);

    expect(typeof balanceConfirmations.balance).isStringOrNumber();
    expect(typeof balanceConfirmations.address).toBe('string');
    expect(typeof balanceConfirmations.confirmations).toBe('number');
    expect(balanceConfirmations.address).toBe(address);
    expect(balanceConfirmations.confirmations).toBe(confirmations);
});

it('balance confirmations, long as string', async () => {
    const {address} = STATE.ACCOUNTS.SIMPLE;
    const confirmations = 3;
    const balanceConfirmations = await api.addresses.fetchBalanceConfirmations(address, confirmations, largeNumbeConvertHeader);

    expect(typeof balanceConfirmations.balance).toBe('string');
    expect(typeof balanceConfirmations.address).toBe('string');
    expect(typeof balanceConfirmations.confirmations).toBe('number');
    expect(balanceConfirmations.address).toBe(address);
    expect(balanceConfirmations.confirmations).toBe(confirmations);
});

it('address by public key', async () => {
    const {address, publicKey} = STATE.ACCOUNTS.SIMPLE;
    const addressByPublicKey = await api.addresses.fetchPublicKey(publicKey);

    expect(addressByPublicKey.address).toBe(address)
});

it('address balance', async () => {
    const {address} = STATE.ACCOUNTS.SIMPLE;
    const balance = await  api.addresses.fetchBalance(address);

    expect(typeof balance.balance).isStringOrNumber();
    expect(typeof balance.address).toBe('string');
    expect(typeof balance.confirmations).toBe('number');
    expect(balance.address).toBe(address);
});

it('address balance, long as string', async () => {
    const {address} = STATE.ACCOUNTS.SIMPLE;
    const balance = await  api.addresses.fetchBalance(address, largeNumbeConvertHeader);

    expect(typeof balance.balance).toBe('string');
    expect(typeof balance.address).toBe('string');
    expect(typeof balance.confirmations).toBe('number');
    expect(balance.address).toBe(address);
});

/*
it('multiple account balance', async () => { //AB
    const txIds = [] as string[];

    const {address} = STATE.ACCOUNTS.SIMPLE;
    const balance = await  api.addresses.fetchMultipleBalance(addresses);

    expect(typeof balance.balance).isStringOrNumber();
    expect(typeof balance.address).toBe('string');
    expect(typeof balance.confirmations).toBe('number');
    expect(balance.address).toBe(address);
});


 */



it('address effective balance', async () => {
    const {address} = STATE.ACCOUNTS.SIMPLE;
    const balance = await  api.addresses.fetchEffectiveBalance(address);

    expect(typeof balance.balance).isStringOrNumber();
    expect(typeof balance.address).toBe('string');
    expect(typeof balance.confirmations).toBe('number');
    expect(balance.address).toBe(address);
});

it('address effective balance, long as string', async () => {
    const {address} = STATE.ACCOUNTS.SIMPLE;
    const balance = await  api.addresses.fetchEffectiveBalance(address, largeNumbeConvertHeader);

    expect(typeof balance.balance).toBe('string');
    expect(typeof balance.address).toBe('string');
    expect(typeof balance.confirmations).toBe('number');
    expect(balance.address).toBe(address);
});

it('effective balance confirmations', async () => {
    const {address} = STATE.ACCOUNTS.SIMPLE;
    const confirmations = 3;
    const balanceConfirmations = await api.addresses.fetchEffectiveBalanceConfirmations(address, confirmations);

    expect(typeof balanceConfirmations.balance).isStringOrNumber();
    expect(typeof balanceConfirmations.address).toBe('string');
    expect(typeof balanceConfirmations.confirmations).toBe('number');
    expect(balanceConfirmations.address).toBe(address);
    expect(balanceConfirmations.confirmations).toBe(confirmations);
});

it('effective balance confirmations, long as string', async () => {
    const {address} = STATE.ACCOUNTS.SIMPLE;
    const confirmations = 3;
    const balanceConfirmations = await api.addresses.fetchEffectiveBalanceConfirmations(address, confirmations, largeNumbeConvertHeader);

    expect(typeof balanceConfirmations.balance).toBe('string');
    expect(typeof balanceConfirmations.address).toBe('string');
    expect(typeof balanceConfirmations.confirmations).toBe('number');
    expect(balanceConfirmations.address).toBe(address);
    expect(balanceConfirmations.confirmations).toBe(confirmations);
});

it('wallet addressed', async () => {
    const address = MASTER_ACCOUNT.ADDRESS;
    const walletAddresses = await api.addresses.fetchAddresses();

    expect(walletAddresses).toBeInstanceOf(Array);
    expect(walletAddresses[0]).toBe(address);

});

it('validate address, valid address', async () => {
    const {address} = STATE.ACCOUNTS.SIMPLE;
    const validateAddress = await  api.addresses.fetchValidate(address);

    expect(validateAddress.address).toBe(address);
    expect(validateAddress.valid).toBe(true);
});

it('validate address, invalid address', async () => {
    const {address} = STATE.ACCOUNTS.SIMPLE;
    const invalidAddress = address.replace("3", "4");
    const validateAddress = await  api.addresses.fetchValidate(invalidAddress);

    expect(validateAddress.address).toBe(invalidAddress);
    expect(validateAddress.valid).toBe(false);
});

/*
it('Fetch seed', async () => {   //AB
    const {address} = STATE.ACCOUNTS.SIMPLE;
    const fetchSeed = await api.addresses.fetchSeed(address);

    expect(typeof fetchSeed.length).toBe('number');
    expect(fetchSeed.length).toEqual(address.)
    toBe('number');
    expect(balance.address).toBe(address);
});


 */

it('Fetch seq', async () => {   //AB
    
    const seq = await api.addresses.fetchSeq(0,20);
    console.log(seq);
    let l = seq.length;
    for (let i=0;i<l;i++) {
        expect(typeof seq[i]).toBe('string');
    }

});