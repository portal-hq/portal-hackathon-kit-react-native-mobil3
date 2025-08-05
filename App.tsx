import React, { useEffect, useState } from 'react';
import { StatusBar, View, KeyboardAvoidingView, Platform } from 'react-native';
import {
  SafeAreaInsetsContext,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { styles } from './style/stylesheet';
import Portal, { PortalContextProvider } from '@portal-hq/core';
import Screen from './lib/screens';
import Home from './screens/Home';
import { createPortalInstance } from './lib/portal';
import Wallet from './screens/Wallet';
import { MONAD_TESTNET_CHAIN_ID, PORTAL_CLIENT_API_KEY } from './config';

function App() {
  const [address, setAddress] = useState<string>('');
  const [chain] = useState<string>(MONAD_TESTNET_CHAIN_ID);
  const [portal, setPortal] = useState<Portal | null>(null);
  const [screen, setScreen] = useState<Screen>(Screen.Home);

  useEffect(() => {
    if (!portal) {
      const portal = createPortalInstance(PORTAL_CLIENT_API_KEY);
      setPortal(portal);
    } else {
      (async () => {
        const addresses = await portal.addresses;

        if (addresses?.eip155) {
          console.log(`EIP-155 address: ${addresses.eip155}`);
          setAddress(addresses.eip155);
        }
      })();
    }
  }, [portal]);

  return (
    <SafeAreaProvider>
      <PortalContextProvider value={portal as Portal}>
        <SafeAreaInsetsContext.Consumer>
          {insets => (
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={[
                styles.container,
                styles.safeArea,
                {
                  paddingTop: insets ? insets.top : 0,
                },
              ]}
            >
              <StatusBar barStyle="light-content" />
              <View style={styles.container}>
                {screen === Screen.Home && (
                  <Home setAddress={setAddress} setScreen={setScreen} />
                )}
                {screen === Screen.Wallet && (
                  <Wallet address={address} chain={chain} />
                )}
              </View>
            </KeyboardAvoidingView>
          )}
        </SafeAreaInsetsContext.Consumer>
      </PortalContextProvider>
    </SafeAreaProvider>
  );
}

export default App;
