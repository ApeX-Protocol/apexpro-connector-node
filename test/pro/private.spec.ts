import { proUser } from '../../src/mock';
import {
  ApexClient,
  ApexMarket,
  ApiKeyCredentials,
  CreateOrderOptionsObject,
  generateRandomClientId,
  OrderSide,
  OrderType,
  PROD,
  QA,
  Trace,
} from '../../src/pro';
import BigNumber from 'bignumber.js';

describe('Private Api Example', () => {
  let apexClient: ApexClient;
  const currentPerpetual = 'USDC'

  before(async () => {
    apexClient = new ApexClient(QA);
    const apiKeyCredentials: ApiKeyCredentials = {
      key: proUser.key,
      passphrase: proUser.passphrase,
      secret: proUser.secret,
    };
    const startPrivateKey: string = proUser.privateKey;
    const accountId: string = proUser.accountId;
    await apexClient.init(apiKeyCredentials, startPrivateKey, accountId);
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

  it('GET Trade History', async () => {
    const { orders } = await apexClient.privateApi.tradeHistory(`BTC-${currentPerpetual}`, 'OPEN');
    Trace.print(orders);
  });

  it('GET Worst Price', async () => {
    const price = await apexClient.privateApi.getWorstPrice(`BTC-${currentPerpetual}`, '0.01', 'BUY');
    // const price = await apexClient.privateApi.getWorstPrice('BTC-USDT', '0.01', 'BUY');
    Trace.print(price);
  });

  it('POST Creating Orders', async () => {
    const symbol = `BTC-${currentPerpetual}`;
    console.log('symbol', symbol)
    // const symbol = 'BTC-USDT';
    const price = '24046.0';
    const size = '0.01';

    const baseCoinRealPrecision = apexClient.symbols[symbol].baseCoinRealPrecision;
    const takerFeeRate = apexClient.account.takerFeeRate;

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

    const result = await apexClient.privateApi.createOrder(
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


  it('GET Open Orders', async () => {
    const { orders } = await apexClient.privateApi.openOrders();
    Trace.print(orders);
  });


  it('POST Cancel all Open Orders', async () => {
    const symbol = `BTC-${currentPerpetual}`;
    // const symbol = 'BTC-USDT';
    await apexClient.privateApi.cancelAllOrder(symbol);
  });


  it('GET All Order History', async () => {
    const { orders } = await apexClient.privateApi.historyOrders();
    Trace.print(orders);
  });


  it('GET Order ID', async () => {
    const orderId = '557260254170054997';
    const order = await apexClient.privateApi.getOrder(orderId);
    Trace.print(order);
  });


  it('POST Cancel Order', async () => {
    const orderId = '557260254170054997';
    const result = await apexClient.privateApi.cancelOrder(orderId);
    Trace.print(result);
  });


  it('POST Cancel Order By ClientOrderId', async () => {
    const clientOrderId = '3773562820849392';
    const result = await apexClient.privateApi.cancelOrderByClientOrderId(clientOrderId);
    Trace.print(result);
  });

  it('GET Order by clientOrderId', async () => {
    const orderId = '3773562820849392';
    const order = await apexClient.privateApi.getOrderByClientOrderId(orderId);
    Trace.print(order);
  });


  it('GET Funding Rate', async () => {
    const { fundingValues, totalSize } = await apexClient.privateApi.fundingRate(currentPerpetual as 'USDC' | 'USDT');
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
});
