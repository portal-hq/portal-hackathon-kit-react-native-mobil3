import React, { Dispatch, FC, SetStateAction } from 'react';
import { View } from 'react-native';

import Screen from '../../lib/screens';

import { styles } from '../../style/stylesheet';

import CreateWalletComponent from './create-wallet';
import RecoverWalletComponent from './recover-wallet';

interface HomeComponentProps {
  setAddress: Dispatch<SetStateAction<string>>;
  setScreen: Dispatch<SetStateAction<Screen>>;
}

const HomeComponent: FC<HomeComponentProps> = ({ setAddress, setScreen }) => {
  return (
    <View style={styles.container}>
      <CreateWalletComponent setAddress={setAddress} setScreen={setScreen} />
      <RecoverWalletComponent setAddress={setAddress} setScreen={setScreen} />
    </View>
  );
};

export default HomeComponent;
