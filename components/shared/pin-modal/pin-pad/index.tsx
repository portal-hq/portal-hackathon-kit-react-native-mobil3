import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../../../../style/stylesheet';

interface PinPadProps {
  label: string;
  onSubmit: () => void | Promise<void>;
  pinLength: number;
  setPin: Dispatch<SetStateAction<string>>;
}

const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'];
const { width } = Dimensions.get('window');
const keySize = Math.min(width / 4.5, 80); // Smaller, more reasonable size
const keyTextSize = 24;

const PinPad: FC<PinPadProps> = ({ label, onSubmit, pinLength, setPin }) => {
  const [code, setCode] = useState<string[]>([]);

  const handlePress = async (item: string) => {
    if (item === 'del') {
      setCode(prev => prev.slice(0, -1));
    } else if (item !== '' && code.length < pinLength) {
      const newCode = [...code, item];
      setCode(newCode);

      // If this completes the PIN (reaches pinLength), auto-submit
      if (newCode.length === pinLength) {
        // Small delay to show the final dot filled before submitting
        setTimeout(async () => {
          await onSubmit();
        }, 150);
      }
    }
  };

  useEffect(() => {
    if (code) {
      setPin(code.join(''));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <View style={[styles.container, { alignItems: 'center' }]}>
      {/* Title */}
      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: '#FFF',
          marginBottom: 20,
          textAlign: 'center',
        }}
      >
        Enter PIN
      </Text>

      <Text
        style={{
          fontSize: 16,
          color: '#999',
          marginBottom: 40,
          textAlign: 'center',
        }}
      >
        {label}
      </Text>

      {/* PIN dots indicator */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 50,
          gap: 15,
        }}
      >
        {Array.from({ length: pinLength }).map((_, index) => (
          <View
            key={index}
            style={{
              width: 16,
              height: 16,
              borderRadius: 8,
              backgroundColor: index < code.length ? '#007BFF' : '#333',
              borderWidth: 2,
              borderColor: index < code.length ? '#007BFF' : '#555',
            }}
          />
        ))}
      </View>

      {/* Number pad */}
      <FlatList
        columnWrapperStyle={{ gap: 15, justifyContent: 'center' }}
        contentContainerStyle={{ gap: 15 }}
        data={keys}
        keyExtractor={(_, index) => index.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePress(item as string)}
            style={{
              width: keySize,
              height: keySize,
              borderRadius: keySize / 2,
              backgroundColor: item === '' ? 'transparent' : '#1a1a1a',
              borderWidth: item === '' ? 0 : 1,
              borderColor: '#333',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: item === '' ? 0 : 1,
            }}
            disabled={item === ''}
          >
            {item === 'del' ? (
              <Text
                style={{
                  color: '#FFF',
                  fontSize: keyTextSize,
                  fontWeight: 'bold',
                }}
              >
                ⌫
              </Text>
            ) : item !== '' ? (
              <Text
                style={{
                  color: '#FFF',
                  fontSize: keyTextSize,
                  fontWeight: '600',
                }}
              >
                {item}
              </Text>
            ) : null}
          </TouchableOpacity>
        )}
        scrollEnabled={false}
        style={{ flexGrow: 0 }}
      />
    </View>
  );
};

export default PinPad;
