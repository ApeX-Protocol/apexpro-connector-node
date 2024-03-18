import {ApexClient, ApexClientV2, PROD, QA, Trace} from '../src';

describe('Public Api Example', () => {
  let apexClient: ApexClientV2;
  const currentPerpetual = 'USDT'

  before(async () => {
    // init qa
    apexClient = new ApexClientV2(QA);
  });

  it('GET System Time', async () => {
    const time = await apexClient.publicApi.time();
    Trace.print(time);
  });

  it('GET All Config Data', async () => {
    const symbols = await apexClient.publicApi.symbolsV2();
    Trace.print(symbols);
  });

  it('GET Market Depth', async () => {
    const depth = await apexClient.publicApi.depth(`BTC${currentPerpetual}`);
    Trace.print(depth);
  });

  it('GET Newest Trading Data', async () => {
    const trades = await apexClient.publicApi.trades(`BTC${currentPerpetual}`);
    Trace.print(trades);
  });

  //
  it('GET Candlestick Chart Data', async () => {
    const kline = await apexClient.publicApi.klines(`BTC${currentPerpetual}`, '1', undefined, undefined, 100);
    Trace.print(kline);
  });

  it('GET Ticker Data', async () => {
    const tickers = await apexClient.publicApi.tickers(`BTC${currentPerpetual}`);
    Trace.print(tickers);
  });

  // update v2
  it('GET Funding Rate History', async () => {
    const historyFunding = await apexClient.publicApi.historyFundingV2(`BTC-${currentPerpetual}`);
    Trace.print(historyFunding);
  });

  it('GET Check If User Exists', async () => {
    const checkUserExist = await apexClient.publicApi.checkUserExist('0x0000000000000000000000000000000000000000');
    Trace.print(checkUserExist);
  });
});
