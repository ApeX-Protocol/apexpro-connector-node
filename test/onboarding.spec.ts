import { ENV, createStartKey, onboardingAccount, web3 } from '../src';

const useProd = false
const privateKey = '42b81f4a8becf2ca03ec734c002c69d7150989a00cbb00b439d9af782545451a';

describe('Onboarding Example', () => {
  let env;
  before(async () => {
    // init qa client
    env = new ENV(useProd ? 'https://pro.apex.exchange' : 'https://qa.pro.apex.exchange', useProd ? 1 : 5);
  });

  it('Onboarding USDC', async () => {
    const v2 = await onboardingAccount({
      env,
      privateKey,
      rpcUrl: 'https://ethereum-goerli.publicnode.com',
    });
    console.log('v2', v2);
  });

  it('Onboarding USDT', async () => {
    const v2 = await onboardingAccount({
      env,
      privateKey,
      rpcUrl: 'https://ethereum-goerli.publicnode.com',
      token: 'USDT'
    });
    console.log('v2', v2);
  });

  it('Create StarkKey', async () => {
    const signer = await web3.eth.accounts.wallet.add(privateKey);
    const v2 = await createStartKey(signer, env, 'USDC', 'https://ethereum-goerli.publicnode.com');
  });


  
});