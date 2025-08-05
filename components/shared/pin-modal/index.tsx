import { Dispatch, FC, SetStateAction } from 'react';
import {
  Pressable,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { styles } from '../../../style/stylesheet';
import LinearGradient from 'react-native-linear-gradient';
import PinPad from './pin-pad';

interface PinModalProps {
  label: string;
  onSubmit: () => void | Promise<void>;
  pinLength: number;
  setPin: Dispatch<SetStateAction<string>>;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const PinModal: FC<PinModalProps> = ({
  label,
  onSubmit,
  pinLength,
  setPin,
  setVisible,
}) => {
  
  return (
    <View style={styles.modalContainer}>
      <LinearGradient
        colors={['#000', '#1a1a1a', '#2a2a2a']}
        style={styles.container}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              paddingHorizontal: 20,
              paddingVertical: 40,
            }}
          >
            <Pressable
              onPress={() => setVisible(false)}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 101,
                backgroundColor: '#333',
                borderRadius: 20,
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: 18, color: '#FFF', fontWeight: 'bold' }}>
                ×
              </Text>
            </Pressable>
            <PinPad
              label={label}
              onSubmit={onSubmit}
              pinLength={pinLength}
              setPin={setPin}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
};

export default PinModal;
