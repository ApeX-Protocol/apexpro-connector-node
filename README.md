
# Installation

```
yarn add apexpro-connector-node
npm install apexpro-connector-node
```


# Environment

```javascript
// QA
let apexClient:ApexClient = new ApexClient.omni(OMNI_QA);

// PROD
let apexClient:ApexClient = new ApexClient.omni(OMNI);
```


# Public Api Example

Please refer to [public api](test/omni/public.spec.ts)

```typescript
let apexClient = new ApexClient.omni(OMNI);
console.log(await apexClient.publicApi.time())
console.log(await apexClient.publicApi.symbols())
console.log(await apexClient.publicApi.depth('BTCUSDT'))
console.log(await apexClient.publicApi.trades('BTCUSDT'))
console.log(await apexClient.publicApi.klines('BTCUSDT', '1'))
console.log(await apexClient.publicApi.tickers('BTCUSDT'))
console.log(await apexClient.publicApi.historyFunding('BTC-USDT'))
console.log(await apexClient.publicApi.checkUserExist('0x0000000000000000000000000000000000000000'))   
```


# Private Api Example

Please refer to [private api](test/omni/private.spec.ts)

```typescript
let apexClient = new ApexClient.omni(OMNI);
const apiKeyCredentials: ApiKeyCredentials = {
    key: 'api key',
    passphrase: ' passphrase ',
    secret: ' secret',
};
const seed: string = "your omnikey";
await apexClient.init(apiKeyCredentials, seed);


```

