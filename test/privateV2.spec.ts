import {
  ApexClientV2,
  ApiKeyCredentials,
  CreateOrderOptionsObject,
  generateRandomClientId,
  OrderSide,
  OrderType,
  PROD,
  QA,
  Trace,
} from '../src';
import BigNumber from 'bignumber.js';
import { getPerpetual, setPerpetual } from '../src/starkex-lib';

describe('Private Api Example', () => {
  let apexClient: ApexClientV2;
  const currentPerpetual = 'USDT'

  before(async () => {
    apexClient = new ApexClientV2(QA);
    const apiKeyCredentials: ApiKeyCredentials = {
      key: 'api key',
      passphrase: ' passphrase ',
      secret: ' secret',
    };
    const startPrivateKey: string = 'startPrivateKey';
    const accountId: string = 'your account id';
    await apexClient.init(apiKeyCredentials, startPrivateKey, accountId);
    // setup perpetual USDC or USDT before trading, default is USDC. And if set '' will change to V1 version.
    setPerpetual(currentPerpetual);
  });

  it('GET Retrieve User Data', async () => {
    const user = await apexClient.privateApi.user();
    Trace.print(user);
  });

  it('GET Retrieve User Account Data', async () => {
    const user = await apexClient.privateApi.user();
    const accountInfo = await apexClient.privateApi.getAccount(apexClient.clientConfig.accountId, user.ethereumAddress);
    Trace.print(accountInfo);
  });

  // update v2
  it('GET Trade History', async () => {
    const currentPerpetual = getPerpetual()?.toUpperCase()
    const { orders } = await apexClient.privateApi.tradeHistoryV2(currentPerpetual as 'USDC' | 'USDT', `BTC-${currentPerpetual}`, 'OPEN');
    Trace.print(orders);
  });

  // update v2
  it('GET Worst Price', async () => {
    const currentPerpetual = getPerpetual()?.toUpperCase()
    const price = await apexClient.privateApi.getWorstPriceV2(`BTC-${currentPerpetual}`, '0.01', 'BUY');
    // const price = await apexClient.privateApi.getWorstPrice('BTC-USDT', '0.01', 'BUY');
    Trace.print(price);
  });

  // update v2
  it('POST Creating Orders', async () => {
    const currentPerpetual = getPerpetual()?.toUpperCase()
    const symbol = `BTC-${currentPerpetual}`;
    // const symbol = 'BTC-USDT';
    const price = '24046.0';
    const size = '0.01';

    const baseCoinRealPrecision = apexClient.symbols[symbol].baseCoinRealPrecision;
    const takerFeeRate = apexClient?.account?.accounts?.find(i=>i?.token === getPerpetual())?.takerFeeRate;

    const limitFee = new BigNumber(price)
      .multipliedBy(takerFeeRate || '0')
      .multipliedBy(size)
      .toFixed(baseCoinRealPrecision, BigNumber.ROUND_UP);

      console.log('limitFee', limitFee)

    const apiOrder = {
      limitFee,
      price,
      reduceOnly: false,
      side: OrderSide.BUY,
      size,
      symbol,
      timeInForce: 'GOOD_TIL_CANCEL',
      type: OrderType.LIMIT,
      clientOrderId: generateRandomClientId(),
      positionId: apexClient.clientConfig.accountId,
      trailingPercent: '',
      triggerPrice: '',
    } as CreateOrderOptionsObject;

    const result = await apexClient.privateApi.createOrderV2(
      apiOrder.clientOrderId,
      apiOrder.positionId,
      apiOrder.symbol,
      apiOrder.side,
      apiOrder.type,
      apiOrder.size,
      apiOrder.price,
      apiOrder.limitFee,
      apiOrder.timeInForce,
      apiOrder.triggerPrice,
      apiOrder.trailingPercent,
      apiOrder.reduceOnly,
    );
    Trace.print(result);
  });

  // update v2
  it('GET Open Orders', async () => {
    const currentPerpetual = getPerpetual()?.toUpperCase()
    const { orders } = await apexClient.privateApi.openOrdersV2(currentPerpetual as 'USDC' | 'USDT');
    Trace.print(orders);
  });

  // update v2
  it('POST Cancel all Open Orders', async () => {
    const currentPerpetual = getPerpetual()?.toUpperCase()
    const symbol = `BTC-${currentPerpetual}`;
    await apexClient.privateApi.cancelAllOrderV2(currentPerpetual as 'USDC' | 'USDT', symbol);
  });

  // update v2
  it('GET All Order History', async () => {
    const currentPerpetual = getPerpetual()?.toUpperCase()
    const { orders } = await apexClient.privateApi.historyOrdersV2(currentPerpetual as 'USDC' | 'USDT');
    Trace.print(orders);
  });

  // update v2
  it('GET Order ID', async () => {
    const orderId = '557260254170054997';
    const order = await apexClient.privateApi.getOrderV2(orderId);
    Trace.print(order);
  });

  // update v2
  it('POST Cancel Order', async () => {
    const orderId = '557260254170054997';
    const result = await apexClient.privateApi.cancelOrderV2(orderId);
    Trace.print(result);
  });

  // update v2
  it('POST Cancel Order By ClientOrderId', async () => {
    const clientOrderId = '3773562820849392';
    const result = await apexClient.privateApi.cancelOrderByClientOrderIdV2(clientOrderId);
    Trace.print(result);
  });

  it('GET Order by clientOrderId', async () => {
    const orderId = '3773562820849392';
    const order = await apexClient.privateApi.getOrderByClientOrderId(orderId);
    Trace.print(order);
  });

  // update v2
  it('GET Funding Rate', async () => {
    const currentPerpetual = getPerpetual()?.toUpperCase()
    const { fundingValues, totalSize } = await apexClient.privateApi.fundingRateV2(currentPerpetual as 'USDC' | 'USDT');
    Trace.print(fundingValues, totalSize);
  });

  // update v2
  it('GET User Historial Profit and Loss', async () => {
    const currentPerpetual = getPerpetual()?.toUpperCase()
    const { historicalPnl, totalSize } = await apexClient.privateApi.historicalPNLV2(currentPerpetual as 'USDC' | 'USDT');
    Trace.print(historicalPnl, totalSize);
  });

  // update v2
  it("GET Yesterday's Profit & Loss", async () => {
    const currentPerpetual = getPerpetual()?.toUpperCase()
    const yesterdayPNL = await apexClient.privateApi.yesterdayPNLV2(currentPerpetual as 'USDC' | 'USDT');
    Trace.print(yesterdayPNL);
  });

  it('GET Account Balance', async () => {
    const accountBalance = await apexClient.privateApi.accountBalance();
    Trace.print(accountBalance);
  });
});
