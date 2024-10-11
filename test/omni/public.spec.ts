import { Trace } from '../../src/omni/tool/Tool';
import { ApexClient, OMNI_QA } from '../../src';

describe('Omni Public Api Example', () => {
  let apexClient: ApexClient.omni;
  const env = OMNI_QA

  before(async () => {
    apexClient = new ApexClient.omni(env);
  });

  it('GET System Time', async () => {
    const time = await apexClient.publicApi.time();
    Trace.print(time);
  });

  it('GET All Config Data', async () => {
    const symbols = await apexClient.publicApi.symbols();
    Trace.print(symbols);
  });

  it('GET Market Depth', async () => {
    const depth = await apexClient.publicApi.depth('BTCUSDC');
    Trace.print(depth);
  });

  it('GET Newest Trading Data', async () => {
    const trades = await apexClient.publicApi.trades('BTCUSDC');
    Trace.print(trades);
  });

  //
  it('GET Candlestick Chart Data', async () => {
    const kline = await apexClient.publicApi.klines('BTCUSDC', '1', undefined, undefined, 100);
    Trace.print(kline);
  });

  it('GET Ticker Data', async () => {
    const tickers = await apexClient.publicApi.tickers('BTCUSDC');
    Trace.print(tickers);
  });

  // update v2
  it('GET Funding Rate History', async () => {
    const historyFunding = await apexClient.publicApi.historyFunding('BTC-USDC');
    // const historyFunding = await apexClient.publicApi.historyFunding('BTC-USDT');
    Trace.print(historyFunding);
  });

  it('GET Check If User Exists', async () => {
    const checkUserExist = await apexClient.publicApi.checkUserExist('0x0000000000000000000000000000000000000000');
    Trace.print(checkUserExist);
  });
});
