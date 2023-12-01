import { ENV, onboardingAccount } from '../src';

const useProd = true
const privateKey = 'Input Your PrivateKey Here';

describe('Onboarding Example', () => {
  let env;
  before(async () => {
    // init qa client
    env = new ENV(useProd ? 'https://pro.apex.exchange' : 'https://qa.pro.apex.exchange', useProd ? 1 : 5);
  });

  it('Onboarding USDC', async () => {
    
    const v1 = await onboardingAccount({
      env,
      privateKey,
      rpcUrl: 'https://ethereum-goerli.publicnode.com',
    });
    console.log('v1', v1);
  });

  it('Onboarding USDC', async () => {
    const v2 = await onboardingAccount({
      env,
      privateKey,
      rpcUrl: 'https://ethereum-goerli.publicnode.com',
      version: 'v2',
    });
    console.log('v2', v2);
  });


  // it('Onboarding USDT', async () => {
  //   const v1 = await onboardingAccount({
  //     env,
  //     privateKey,
  //     rpcUrl: 'https://ethereum-goerli.publicnode.com',
  //     version: 'v1',
  //     token: 'USDT'
  //   });
  //   console.log('v1', v1?.account?.accounts);
  // });


  // it('Onboarding USDT', async () => {
  //   const v2 = await onboardingAccount({
  //     env,
  //     privateKey,
  //     rpcUrl: 'https://ethereum-goerli.publicnode.com',
  //     version: 'v2',
  //     token: 'USDT'
  //   });
  //   console.log('v2', v2);
  // });
});
