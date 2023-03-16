import {
  ApexClient,
  ApexMarket,
  ApiKeyCredentials,
  CreateOrderOptionsObject,
  generateRandomClientId,
  OrderSide,
  OrderType,
  PROD,
  Trace,
} from '../src';

describe('Private Api Example', () => {
  let apexClient: ApexClient;

  before(async () => {
    apexClient = new ApexClient(PROD);
    const apiKeyCredentials: ApiKeyCredentials = {
      key: 'api key',
      passphrase: ' passphrase ',
      secret: ' secret',
    };
    const startPrivateKey: string = 'startPrivateKey';
    const accountId: string = 'your account id';
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
    const { orders } = await apexClient.privateApi.tradeHistory('BTC-USDC', 'OPEN');
    Trace.print(orders);
  });
  it('GET Worst Price', async () => {
    const price = await apexClient.privateApi.getWorstPrice('BTC-USDC', '0.01', 'BUY');
    Trace.print(price);
  });

  it('POST Creating Orders', async () => {
    const apiOrder = {
      limitFee: '30',
      price: '24046.0',
      reduceOnly: false,
      side: OrderSide.BUY,
      size: '0.01',
      symbol: ApexMarket.BTC_USDC,
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
  it('POST Cancel Order', async () => {
    const orderId = '423869956023648568';
    const result = await apexClient.privateApi.cancelOrder(orderId);
    Trace.print(result);
  });

  it('POST Cancel Order By ClientOrderId', async () => {
    const clientOrderId = '3773562820849392';
    const result = await apexClient.privateApi.cancelOrderByClientOrderId(clientOrderId);
    Trace.print(result);
  });

  it('GET Open Orders', async () => {
    const { orders } = await apexClient.privateApi.openOrders();
    Trace.print(orders);
  });

  it('POST Cancel all Open Orders', async () => {
    const symbol = 'BTC-USDC';
    await apexClient.privateApi.cancelAllOrder(symbol);
  });

  it('GET All Order History', async () => {
    const { orders } = await apexClient.privateApi.historyOrders();
    Trace.print(orders);
  });
  it('GET Order ID', async () => {
    const orderId = '423869956023648568';
    const order = await apexClient.privateApi.getOrder(orderId);
    Trace.print(order);
  });
  it('GET Order by clientOrderId', async () => {
    const orderId = '3773562820849392';
    const order = await apexClient.privateApi.getOrderByClientOrderId(orderId);
    Trace.print(order);
  });

  it('GET Funding Rate', async () => {
    const { fundingValues, totalSize } = await apexClient.privateApi.fundingRate();
    Trace.print(fundingValues, totalSize);
  });

  it('GET User Historial Profit and Loss', async () => {
    const { historicalPnl, totalSize } = await apexClient.privateApi.historicalPNL();
    Trace.print(historicalPnl, totalSize);
  });
  it('GET User Historial Profit and Loss', async () => {
    const yesterdayPNL = await apexClient.privateApi.yesterdayPNL();
    Trace.print(yesterdayPNL);
  });
});
