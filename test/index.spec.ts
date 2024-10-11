import { omniUser, proUser } from '../src/mock';

import BigNumber from 'bignumber.js';
import { ApiKeyCredentials, CreateOrderOptions, OrderSide, OrderType } from '../src/omni/interface';
import { Trace } from '../src/omni/tool/Tool';
import { ApexClient, ApexClientV2, CreateOrderOptionsObject, generateRandomClientId, OMNI_QA, QA } from '../src';
import { setPerpetual } from '../src/pro/starkex-lib';

describe('Omni&Pro Api Example', () => {
  let apexClient: ApexClientV2;
  let OMNI_apexClient: ApexClient.omni;

  before(async () => {
    // pro
    apexClient = new ApexClientV2(QA);
    const apiKeyCredentials: ApiKeyCredentials = {
      key: proUser.key,
      passphrase: proUser.passphrase,
      secret: proUser.secret,
    };
    const startPrivateKey: string = proUser.privateKey;
    const accountId: string = proUser.accountId;
    await apexClient.init(apiKeyCredentials, startPrivateKey, accountId);
    setPerpetual('USDC');

    // omni
    OMNI_apexClient = new ApexClient.omni(OMNI_QA);
    const OMNI_apiKeyCredentials: ApiKeyCredentials = {
      key: omniUser.key,
      passphrase: omniUser.passphrase,
      secret: omniUser.secret,
    };
    const seed: string = omniUser.seed;
    await OMNI_apexClient.init(OMNI_apiKeyCredentials, seed);
  });

    it('GET Accounts', async () => {
      // pro
      const account = await apexClient.privateApi.getAccountV2(
        apexClient.clientConfig.accountId,
        apexClient.account.ethereumAddress,
      );
      Trace.print(account);

      // omni
      const OMNI_account = await OMNI_apexClient.privateApi.getAccount(
        OMNI_apexClient.clientConfig.accountId,
        OMNI_apexClient.account.ethereumAddress,
      );
      Trace.print(OMNI_account);
    });

  it('POST Creating Orders', async () => {
    const base = 'BTC';

    // pro
    const perp = 'USDC';
    const symbol = base + '-' + perp;
    const price = '46000';
    const size = '0.01';

    const baseCoinRealPrecision = apexClient.symbols?.[symbol]?.baseCoinRealPrecision;
    const takerFeeRate = apexClient?.account?.accounts?.find((i) => i?.token === perp)?.takerFeeRate;

    const limitFee = new BigNumber(price)
      .multipliedBy(takerFeeRate || '0')
      .multipliedBy(size)
      .toFixed(baseCoinRealPrecision || 0, BigNumber.ROUND_UP);

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

    // omni
    const OMNI_symbol = base + `-USDT`;
    const OMNI_price = '46000';
    const OMNI_size = '1';
    const OMNI_baseCoinRealPrecision = OMNI_apexClient?.symbols?.[OMNI_symbol]?.baseCoinRealPrecision;
    const OMNI_takerFeeRate = OMNI_apexClient.account.contractAccount.takerFeeRate;
    const OMNI_makerFeeRate = OMNI_apexClient.account.contractAccount.makerFeeRate;

    const OMNI_limitFee = new BigNumber(OMNI_price)
      .multipliedBy(OMNI_takerFeeRate || '0')
      .multipliedBy(OMNI_size)
      .toFixed(OMNI_baseCoinRealPrecision || 0, BigNumber.ROUND_UP);

    const OMNI_apiOrder = {
      pairId: OMNI_apexClient.symbols[OMNI_symbol]?.l2PairId,
      makerFeeRate: OMNI_makerFeeRate,
      takerFeeRate: OMNI_takerFeeRate,
      symbol: OMNI_symbol,
      side: OrderSide.BUY,
      type: OrderType.LIMIT,
      size: OMNI_size,
      price: OMNI_price,
      limitFee: OMNI_limitFee.toString(),
      reduceOnly: false,
      timeInForce: 'GOOD_TIL_CANCEL',
      expiration: Math.floor(Date.now() / 1000 + 30 * 24 * 60 * 60),
      trailingPercent: '',
      triggerPrice: '',
    } as CreateOrderOptions;

    const OMNI_result = await OMNI_apexClient.privateApi.createOrder(OMNI_apiOrder);
    Trace.print(OMNI_result);
  });
});
