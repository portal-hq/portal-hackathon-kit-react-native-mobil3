import React, { FC, useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  RefreshControl,
} from 'react-native';
import { styles } from '../../style/stylesheet';
import {
  getAssetBalances,
  transferToken,
  fundWalletWithTestnetTokens,
  NativeBalance,
  TokenBalance,
} from '../../lib/portal';
import PortalButton from '../shared/button';
import BackupWallet from './backup-wallet';
import CopyableText from '../shared/copyable-text';
import {
  FUND_AMOUNT,
  MONAD_TESTNET_CHAIN_ID,
  MON_TOKEN_SYMBOL,
  USDC_TOKEN_SYMBOL,
} from '../../config';

interface WalletComponentProps {
  address: string;
  chain: string;
}

const WalletComponent: FC<WalletComponentProps> = ({ address, chain }) => {
  const [nativeBalance, setNativeBalance] = useState<NativeBalance>();
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);

  const [selectedToken, setSelectedToken] = useState<string>(MON_TOKEN_SYMBOL);
  const [sendAddress, setSendAddress] = useState<string>();
  const [sendAmount, setSendAmount] = useState<number>();
  const [transactionHash, setTransactionHash] = useState<string>();
  const [isFunding, setIsFunding] = useState<boolean>(false);
  const [fundingTxHash, setFundingTxHash] = useState<string>();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const sendToken = async () => {
    if (sendAddress && sendAmount) {
      const transactionHash = await transferToken(
        chain,
        sendAddress,
        selectedToken,
        sendAmount,
      );

      setTransactionHash(transactionHash);
    }
  };

  const updateBalances = async () => {
    try {
      const balances = await getAssetBalances(chain);

      // Update native balance
      setNativeBalance(balances.nativeBalance);

      // Update token balances
      setTokenBalances(balances.tokenBalances);
    } catch (error) {
      console.error('Error updating balances:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await updateBalances();
    setRefreshing(false);
  };

  const fundWallet = async () => {
    try {
      setIsFunding(true);

      const response = await fundWalletWithTestnetTokens(
        chain,
        FUND_AMOUNT,
        'NATIVE',
      );

      setFundingTxHash(response.data?.txHash);

      // Update balances after a short delay to allow transaction to process
      setTimeout(() => {
        updateBalances();
        setIsFunding(false);
      }, 5000);
    } catch (error) {
      console.error('Error funding wallet:', error);
      setIsFunding(false);
    }
  };

  useEffect(() => {
    if (address) {
      updateBalances();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, chain]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#2E7D32']}
            tintColor={'#2E7D32'}
            title="Refreshing balances..."
            titleColor="#555"
          />
        }
      >
        <View style={[{ marginTop: 10 }]}>
          <CopyableText value={address} label="Address" maxDisplayLength={40} />
        </View>

        {/* Display all token balances */}
        <View
          style={[
            {
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          ]}
        >
          <View>
            <Text style={styles.formLabel}>
              {nativeBalance?.symbol} Balance
            </Text>
            <Text>
              {nativeBalance !== undefined ? nativeBalance.balance : '...'}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', gap: 8 }}>
            <PortalButton
              title="Refresh"
              onPress={onRefresh}
              style={{
                backgroundColor: refreshing ? '#888' : '#007AFF',
                maxWidth: 100,
                paddingVertical: 10,
              }}
              disabled={refreshing}
            />

            {chain === MONAD_TESTNET_CHAIN_ID && (
              <PortalButton
                title={isFunding ? 'Funding...' : 'Fund Wallet'}
                onPress={fundWallet}
                style={{
                  backgroundColor: isFunding ? 'gray' : '#4BB543',
                  maxWidth: 120,
                  paddingVertical: 10,
                }}
                disabled={isFunding}
              />
            )}
          </View>
        </View>

        {tokenBalances.map(tokenBalance => (
          <View style={[{ marginTop: 10 }]}>
            <Text style={styles.formLabel}>{tokenBalance.symbol} Balance</Text>
            <Text>
              {tokenBalance !== undefined ? tokenBalance.balance : '...'}
            </Text>
          </View>
        ))}

        <View style={[{ marginTop: 20 }]}>
          <Text style={styles.screenTitle}>Send Tokens</Text>

          {/* Token selector */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Token</Text>
            <View style={styles.toggle}>
              {[USDC_TOKEN_SYMBOL, MON_TOKEN_SYMBOL].map((token, index) => (
                <Pressable
                  key={token}
                  onPress={() => setSelectedToken(token)}
                  style={[
                    styles.toggleItem,
                    index === 0
                      ? { marginRight: 2 }
                      : index === 3
                      ? { marginLeft: 2 }
                      : { marginHorizontal: 2 },
                    selectedToken === token ? styles.toggleItemActive : {},
                  ]}
                >
                  <Text
                    style={[
                      styles.toggleItemText,
                      selectedToken === token
                        ? styles.toggleItemTextActive
                        : {},
                    ]}
                  >
                    {token}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Recipient</Text>
            <TextInput
              placeholder="Recipient address"
              onChangeText={setSendAddress}
              style={styles.textInput}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Amount</Text>
            <TextInput
              placeholder="Amount"
              onChangeText={text => setSendAmount(parseFloat(text))}
              style={styles.textInput}
              keyboardType="decimal-pad"
            />
          </View>

          <PortalButton
            title={`Send ${selectedToken}`}
            onPress={sendToken}
            style={{ marginTop: 10 }}
          />
        </View>

        {typeof transactionHash !== 'undefined' &&
          transactionHash.length > 0 && (
            <View style={[{ marginTop: 10 }]}>
              <CopyableText
                value={transactionHash}
                label="Transaction Hash"
                maxDisplayLength={40}
              />
            </View>
          )}

        {typeof fundingTxHash !== 'undefined' && fundingTxHash.length > 0 && (
          <View style={[{ marginTop: 10 }]}>
            <CopyableText
              value={fundingTxHash}
              label="Funding Transaction Hash"
              maxDisplayLength={40}
            />
          </View>
        )}

        <BackupWallet />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default WalletComponent;
