import { cancelOrder, order } from '@waves/waves-transactions'
import { cancelSubmittedOrder, submitOrder } from '../../../src'


const MASTER_SEED = 'test acc 3'
const MATCHER_PUBLIC_KEY = '8QUAqtTckM5B8gvcuP7mMswat9SjKUuafJMusEoSn1Gy'
const MATCHER_URL = 'https://matcher-testnet.waves.exchange/'
const TIMEOUT = 60000

describe('Matcher requests', () => {
    let assetId = '7SGJvTYmBKJEz2G1h2WVfAKYrg1G5FYfPpwUqFmircG'

    beforeAll(async () => {
        jest.setTimeout(60000)
        console.log('Assets setup successful ' + assetId)
    }, TIMEOUT)

    it('should submit and cancel order', async () => {
        const oParams = {
            orderType: 'buy' as 'buy',
            matcherPublicKey: MATCHER_PUBLIC_KEY,
            price: 1000000000,
            amount: 10,
            matcherFee: 1000000,
            priceAsset: null,
            amountAsset: assetId,
        }

        const ord = order(oParams, MASTER_SEED)
        const submitResp = await submitOrder(MATCHER_URL, ord as any)
        expect(submitResp.status).toEqual('OrderAccepted')

        const co = cancelOrder({ orderId: (ord as any).id }, MASTER_SEED)
        const cancelResp: any = await cancelSubmittedOrder(
            MATCHER_URL,
            co,
            ord.assetPair.amountAsset,
            ord.assetPair.priceAsset
        )
        expect(cancelResp.status).toEqual('OrderCanceled')
    }, TIMEOUT)

    it('should submit and cancel market order', async () => {
        const oParams = {
            orderType: 'buy' as 'buy',
            matcherPublicKey: MATCHER_PUBLIC_KEY,
            price: 100000000,
            amount: 10,
            matcherFee: 1000000,
            priceAsset: null,
            amountAsset: assetId,
        }

        const ord = order(oParams, MASTER_SEED)
        const submitResp = await submitOrder(MATCHER_URL, ord as any, { market: false })
        expect(submitResp.status).toEqual('OrderAccepted')

        const co = cancelOrder({ orderId: (ord as any).id }, MASTER_SEED)
        const cancelResp: any = await cancelSubmittedOrder(
            MATCHER_URL,
            co,
            ord.assetPair.amountAsset,
            ord.assetPair.priceAsset
        )
        expect(cancelResp.status).toEqual('OrderCanceled')
    }, TIMEOUT)

    it('order validation', async () => {
        const order1 = order({
            matcherPublicKey: MATCHER_PUBLIC_KEY,
            orderType: 'buy',
            matcherFee: 1000000,
            amountAsset: assetId,
            priceAsset: null,
            amount: 1,
            price: 100000000,
        }, MASTER_SEED)

        const order2 = order({
            matcherPublicKey: MATCHER_PUBLIC_KEY,
            orderType: 'sell',
            matcherFee: 1000000,
            amountAsset: assetId,
            priceAsset: null,
            amount: 1,
            price: 100000000,
        }, MASTER_SEED)

        await submitOrder(MATCHER_URL, order1 as any)
        await submitOrder(MATCHER_URL, order2 as any)
    }, TIMEOUT)
})
