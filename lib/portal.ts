import Portal, { PortalCurve, PortalSharePairStatus } from '@portal-hq/core';
import { PasswordStorage } from '@portal-hq/utils/src/definitions';
import { FundResponse } from '@portal-hq/core/types';
import { MONAD_TESTNET_CHAIN_ID, MONAD_TESTNET_GATEWAY } from '../config';

export interface NativeBalance {
  balance: string;
  decimals: number;
  name: string;
  rawBalance: string;
  symbol: string;
  metadata: {
    address?: string;
  };
}

export interface TokenBalance {
  balance: string;
  decimals: number;
  name: string;
  rawBalance: string;
  symbol: string;
  metadata: {
    address?: string;
    tokenAddress?: string;
  };
}

export interface AssetsResponse {
  nativeBalance: NativeBalance;
  tokenBalances: TokenBalance[];
}

let portal: Portal;

// Portal Initialization functions

/**
 * Initializes and instance of the Portal SDK
 * @param token
 * @returns Portal
 */
export const createPortalInstance = (token: string): Portal => {
  if (!portal || portal.apiKey !== token) {
    portal = new Portal({
      apiKey: token,
      autoApprove: true, // Remove this to add custom approval logic
      backup: {
        password: new PasswordStorage(),
      },
      gatewayConfig: {
        [MONAD_TESTNET_CHAIN_ID]: MONAD_TESTNET_GATEWAY,
      },
    });
  }

  return portal;
};

// Portal Wallet Status functions

/**
 * Gets a list of available recovery methods
 * @returns Promise<string[]>
 */
export const availableRecoveryMethods = async (): Promise<string[]> => {
  const client = await portal.api.getClient();
  let recoveryMethods = [];

  for (let wallet of client.wallets) {
    if (wallet.curve === PortalCurve.SECP256K1) {
      for (let share of wallet.backupSharePairs) {
        if (share.status === PortalSharePairStatus.COMPLETED) {
          recoveryMethods.push(share.backupMethod);
        }
      }
    }
  }

  return recoveryMethods;
};

export const getAssetBalances = async (
  chainId: string,
): Promise<AssetsResponse> => {
  const response = await fetch(
    `https://api.portalhq.io/api/v3/clients/me/chains/${chainId}/assets`,
    {
      headers: {
        Authorization: `Bearer ${portal.apiKey}`,
      },
    },
  );

  return (await response.json()) as AssetsResponse;
};

/**
 * Checks if the wallet has been created yet
 * @returns Promise<boolean>
 */
export const doesWalletExist = async (): Promise<boolean> => {
  const client = await portal.api.getClient();

  for (let wallet of client.wallets) {
    if (wallet.curve === PortalCurve.SECP256K1) {
      for (let share of wallet.signingSharePairs) {
        if (share.status === PortalSharePairStatus.COMPLETED) {
          return true;
        }
      }
    }
  }
  return false;
};

/**
 * Checks if the wallet has been backed up
 * @returns Promise<boolean>
 */
export const isWalletBackedUp = async (): Promise<boolean> => {
  const client = await portal.api.getClient();

  for (let wallet of client.wallets) {
    if (wallet.curve === PortalCurve.SECP256K1) {
      for (let share of wallet.backupSharePairs) {
        if (share.status === PortalSharePairStatus.COMPLETED) {
          return true;
        }
      }
    }
  }
  return false;
};

export const isWalletOnDevice = async (): Promise<boolean> => {
  return true;
};

/**
 * Funds a wallet with testnet tokens
 * @param chainId - The chain ID to fund on
 * @param amount - The amount to fund
 * @param token - The token symbol to fund (use "NATIVE" for the chain's native token)
 * @returns Promise<{ data: { txHash: string } }>
 */
export const fundWalletWithTestnetTokens = async (
  chainId: string,
  amount: string = '0.01',
  token: string = 'NATIVE',
): Promise<FundResponse> => {
  if (!portal) {
    throw new Error('Portal instance not initialized');
  }

  try {
    const response = await portal.receiveTestnetAsset(chainId, {
      amount,
      token,
    });
    console.log(`✅ Transaction hash: ${response.data?.txHash}`);
    return response;
  } catch (error) {
    console.error('Error funding wallet:', error);
    throw error;
  }
};

/**
 * Transfers tokens to another address
 * @param chainId
 * @param recipient
 * @param token
 * @param amount
 * @returns Promise<string> The transaction hash
 */
export const transferToken = async (
  chainId: string,
  recipient: string,
  token: string,
  amount: number,
): Promise<string> => {
  try {
    const transactionHash = await portal.sendAsset(
      recipient,
      token,
      amount.toString(),
      chainId,
    );

    return transactionHash;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
