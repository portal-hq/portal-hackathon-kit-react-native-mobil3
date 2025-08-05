# Portal React Native mobil3 Hackathon Kit

This repository shows you how you can easily integrate Monad into your React Native app using the [Portal SDK](https://docs.portalhq.io/guides/react-native). It covers the following features:

1. Generate a wallet
2. Fetch and display USDC and MON balances
3. Transfer tokens to a given EVM address
4. Fund your wallet with testnet tokens directly from the app (limited to once per Portal client per 24 hours)
5. Backup the wallet with password as the key to Portal servers
6. Recover the wallet with password as the key from Portal servers

Portal SDK also covers the following backup methods which were not covered in this example app but you can learn how to implement them through the [docs](https://docs.portalhq.io/guides/react-native/back-up-a-wallet):

1. Backup with iCloud
2. Backup with GDrive
3. Backup with Passkey

<img alt="demo" src="./readme.png" height="300px" />

## How to Run This Example App

1. Clone the repo to your local system
2. Open the project in your editor of choice
3. Go to your Portal Dashboard [settings page](https://app.portalhq.io/settings#client-api-keys) and create a client test API key
4. Update the **PORTAL_CLIENT_API_KEY** in `config.ts` with your Portal Client API Key
5. Update the **ALCHEMY_API_KEY** in `config.ts` with an API key from Alchemy (you can get one [here](https://www.alchemy.com/)). Note: If Alchemy doesn't support Monad, use a different RPC provider.
6. Run the app with `npm run ios` or `npm run android`

## Understanding the Example App

This app is made up of two main screens: Home and Wallet. The Home screen is where you can generate a new wallet or recover a backed up wallet, and the Wallet screen is where you can view your wallet details and perform transactions and backup.

Here are the important project files:

1. `config.ts`: This is where the configuration for the app lives.
2. `lib/portal.ts`: This is where all the **Portal** logic is implemented. For more info on how to use the React Native Portal SDK please refer to [this doc](https://docs.portalhq.io/guides/react-native)
3. `components/home/index.tsx`: The parent component for the Home screen
4. `components/wallet/index.tsx`: The parent component for the Wallet screen

## Faucets

You can get more `USDC` tokens for testing with the below faucet.

- [Monad Testnet Faucet](https://example.com/monad-faucet) - Get testnet `USDC` tokens (Update with actual link)

## Portal Documentation

### Portal SDK Reference

Portal's SDKs have several pieces of core functionality.

- [Generating a Wallet](https://docs.portalhq.io/guides/react-native/create-a-wallet): This function creates MPC key shares on your local device and the Portal servers. These key shares support all EVM chains, Solana, and many other chains.
- [Signing a Transaction](https://docs.portalhq.io/guides/react-native/sign-a-transaction): This function signs a provided transaction, and can broadcast that transaction to a chain when an RPC gateway URL is provided.
- [Signature Hooks](https://docs.portalhq.io/guides/react-native/add-custom-signature-hooks): By default this repo will submit a transaction without prompting a user, but you can use signature hooks to build a prompt for users before submitting a transaction for signing.

### Portal APIs

Portal supplies several APIs for simplifying your development.

- [Get Assets](https://docs.portalhq.io/reference/client-api/v3-endpoints#get-assets-by-chain): This endpoint returns a list of fungible asset (native, ERC-20, and SPL tokens) associated with your client for a given chain.
- [Get NFTs](https://docs.portalhq.io/reference/client-api/v3-endpoints#get-nft-assets-by-chain): This endpoint returns a list of the NFTs associated with your client for a given chain.
- [Get Transactions](https://docs.portalhq.io/reference/client-api/v3-endpoints#get-transactions-by-chain): This endpoint returns a list of the historic transactions associated with your client for a given chain.
- [Build a Transaction - Send Asset](https://docs.portalhq.io/reference/client-api/v3-endpoints#build-a-send-asset-transaction): This endpoint builds a formatted transaction to send a fungible asset (native, ERC-20, and SPL tokens) for a given chain.
- [Evaluate a Transaction](https://docs.portalhq.io/reference/client-api/v3-endpoints#evaluate-a-transaction): This endpoint can simulate a transaction and/or scan a transaction for security concerns.

### Other Helpful Resources

- [What is Portal MPC?](https://docs.portalhq.io/resources/portals-mpc-architecture)

## Help

Need help or want to request a feature? Reach out to us on the [official Portal Community Slack](https://portalcommunity.slack.com/archives/C07EZFF9N78).
