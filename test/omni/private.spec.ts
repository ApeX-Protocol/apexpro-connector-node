
import { omniUser } from '../../src/mock';

import BigNumber from 'bignumber.js';
import {
  ApiKeyCredentials,
  CreateOrderOptions,
  OrderSide,
  OrderType,
} from '../../src/omni/interface';
import { Trace } from '../../src/omni/tool/Tool';
import { ApexClient, OMNI_QA } from '../../src';

describe('Omni Private Api Example', () => {
  let apexClient: ApexClient.omni;
  const env = OMNI_QA

  before(async () => {
    apexClient = new ApexClient.omni(env);
    const apiKeyCredentials: ApiKeyCredentials = {
      key: omniUser.key,
      passphrase: omniUser.passphrase,
      secret: omniUser.secret,
    };
    const seed: string = omniUser.seed;
    await apexClient.init(apiKeyCredentials, seed);
  });

  it('GET Trade History', async () => {
    const { orders } = await apexClient.privateApi.tradeHistory(`BTC-USDT`, 'OPEN');
    Trace.print(orders);
  });

  it('GET Worst Price', async () => {
    const res = await apexClient.privateApi.getWorstPrice('BTC-USDT', '0.01', 'BUY').catch((error) => {
      console.log('error', error);
    });
    Trace.print(res);
  });

  it('Get Worst Price', async () => {
    const res = await apexClient.privateApi.getWorstPrice('BTC-USDT', '0.01', 'BUY').catch((error) => {
      console.log('error', error);
    });
    Trace.print(res);
  });

  it('POST Creating Orders', async () => {
    const symbol = `BTC-USDT`;
    const price = '46000';
    const size = '1';
    const baseCoinRealPrecision = apexClient?.symbols?.[symbol]?.baseCoinRealPrecision;
    const takerFeeRate = apexClient.account.contractAccount.takerFeeRate;
    const makerFeeRate = apexClient.account.contractAccount.makerFeeRate;

    const limitFee = new BigNumber(price)
      .multipliedBy(takerFeeRate || '0')
      .multipliedBy(size)
      .toFixed(baseCoinRealPrecision, BigNumber.ROUND_UP);

    const apiOrder = {
      pairId: apexClient.symbols[symbol]?.l2PairId,
      makerFeeRate,
      takerFeeRate,
      symbol,
      side: OrderSide.BUY,
      type: OrderType.LIMIT,
      size,
      price,
      limitFee,
      reduceOnly: false,
      timeInForce: 'GOOD_TIL_CANCEL',
      expiration: Math.floor(
        Date.now() / 1000 + 30 * 24 * 60 * 60
      ),
      trailingPercent: '',
      triggerPrice: '',
    } as CreateOrderOptions;

    const result = await apexClient.privateApi.createOrder(apiOrder);
    Trace.print(result);
  });

  it('GET Open Orders', async () => {
    const { orders } = await apexClient.privateApi.openOrders();
    Trace.print(orders);
  });

  it('POST Cancel all Open Orders', async () => {
    const symbol = `BTC-USDT`;
    await apexClient.privateApi.cancelAllOrder(symbol);
  });

  it('GET All Order History', async () => {
    const { orders } = await apexClient.privateApi.historyOrders();
    Trace.print(orders);
  });

  it('POST Cancel Order', async () => {
    const orderId = '632428509349806941';
    const result = await apexClient.privateApi.cancelOrder(orderId);
    Trace.print(result);
  });


  it('GET Funding Rate', async () => {
    const { fundingValues, totalSize } = await apexClient.privateApi.fundingRate();
    Trace.print(fundingValues, totalSize);
  });

  it('GET User Historial Profit and Loss', async () => {
    const { historicalPnl, totalSize } = await apexClient.privateApi.historicalPNL();
    Trace.print(historicalPnl, totalSize);
  });

  it("GET Yesterday's Profit & Loss", async () => {
    const yesterdayPNL = await apexClient.privateApi.yesterdayPNL();
    Trace.print(yesterdayPNL);
  });

  it('GET Account Balance', async () => {
    const accountBalance = await apexClient.privateApi.accountBalance();
    Trace.print(accountBalance);
  });

  it('GET Get Order', async () => {
    const orderId = "698914499098312793"
    const order = await apexClient.privateApi.getOrder(orderId);
    Trace.print(order);
  });

  it('GET Get Client Order', async () => {
    const clientOrderId = "apexomni-634283468140839001-1744471003321-775651"
    const order = await apexClient.privateApi.getOrderByClientOrderId(clientOrderId);
    Trace.print(order);
  });


});
