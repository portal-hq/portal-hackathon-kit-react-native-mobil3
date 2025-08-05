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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Pressable
            onPress={() => setVisible(false)}
            style={[
              styles.section,
              {
                alignItems: 'flex-end',
                alignContent: 'flex-end',
                flexDirection: 'row',
                flexGrow: 0,
                justifyContent: 'flex-end',
                position: 'absolute',
                right: 0,
                top: 0,
                zIndex: 101,
              },
            ]}
          >
            <Text style={{ fontSize: 24 }}>x</Text>
          </Pressable>
          <PinPad
            label={label}
            onSubmit={onSubmit}
            pinLength={pinLength}
            setPin={setPin}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default PinModal;
