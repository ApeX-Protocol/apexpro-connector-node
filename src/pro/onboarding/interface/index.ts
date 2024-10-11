export enum SigningMethod {
    TypedData = "TypedData", // order hashed according to EIP-712
    MetaMask = "MetaMask", // order hashed according to EIP-712 (MetaMask-only)
    MetaMaskLatest = "MetaMaskLatest", // ... according to latest version of EIP-712 (MetaMask-only)
    CoinbaseWallet = "CoinbaseWallet", // ... according to latest version of EIP-712 (CoinbaseWallet)
    Personal = "Personal", // message signed with personal_sign
    Personal2 = "Personal2", // message signed with personal_sign
  }