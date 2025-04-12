
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

Please refer to [public api](test/public.spec.ts)

```typescript
let apexClient:ApexClient = new ApexClient(PROD);
console.log(await apexClient.publicApi.time())
console.log(await apexClient.publicApi.symbols())
console.log(await apexClient.publicApi.depth('BTCUSDC'))
console.log(await apexClient.publicApi.trades('BTCUSDC'))
console.log(await apexClient.publicApi.klines('BTCUSDC', '1'))
console.log(await apexClient.publicApi.tickers('BTCUSDC'))
console.log(await apexClient.publicApi.historyFunding('BTC-USDC'))
console.log(await apexClient.publicApi.checkUserExist('0x0000000000000000000000000000000000000000'))   
```


# Private Api Example

Please refer to [private api](test/private.spec.ts)

```typescript
let apexClient:ApexClient = new ApexClient(PROD);
const apiKeyCredentials: ApiKeyCredentials = {
  key: 'api key',
  passphrase: ' passphrase ',
  secret: ' secret',
};
const startPrivateKey: string = 'start Private Key';
const accountId: string = 'your account id';
await apexClient.init(apiKeyCredentials, startPrivateKey, accountId);


```

