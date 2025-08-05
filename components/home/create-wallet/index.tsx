import React, { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { View } from 'react-native';
import { usePortal } from '@portal-hq/core';

import { doesWalletExist } from '../../../lib/portal';
import Screen from '../../../lib/screens';

import { styles } from '../../../style/stylesheet';
import PortalButton from '../../shared/button';

interface CreateWalletComponentProps {
  setAddress: Dispatch<SetStateAction<string>>;
  setScreen: Dispatch<SetStateAction<Screen>>;
}

const CreateWalletComponent: FC<CreateWalletComponentProps> = ({
  setAddress,
  setScreen,
}) => {
  const portal = usePortal();

  const createWallet = async () => {
    if (portal) {
      const addresses = await portal.createWallet();

      if (addresses.eip155) {
        setAddress(addresses.eip155);
        setScreen(Screen.Wallet);
      }
    }
  };

  useEffect(() => {
    if (portal) {
      (async () => {
        const walletExists = await doesWalletExist();
        if (walletExists) {
          setScreen(Screen.Wallet);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portal]);

  return (
    <View style={styles.section}>
      <PortalButton title="Create Wallet" onPress={createWallet} />
    </View>
  );
};

export default CreateWalletComponent;
