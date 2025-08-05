import React, { Dispatch, FC, SetStateAction } from 'react';
import { Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { styles } from '../style/stylesheet';
import HomeComponent from '../components/home';
import Screen from '../lib/screens';

interface HomeProps {
  setAddress: Dispatch<SetStateAction<string>>;
  setScreen: Dispatch<SetStateAction<Screen>>;
}

const Home: FC<HomeProps> = ({ setAddress, setScreen }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={true}
      >
        <Text style={styles.screenTitle}>Home</Text>

        <HomeComponent setAddress={setAddress} setScreen={setScreen} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Home;
