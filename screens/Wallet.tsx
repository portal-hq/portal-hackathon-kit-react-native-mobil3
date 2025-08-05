import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { styles } from '../style/stylesheet';
import WalletComponent from '../components/wallet';

interface WalletProps {
  address: string;
  chain: string;
}

const Wallet: FC<WalletProps> = ({ address, chain }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Wallet</Text>
      <WalletComponent address={address} chain={chain} />
    </View>
  );
};

export default Wallet;
