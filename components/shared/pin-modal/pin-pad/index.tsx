import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../../../../style/stylesheet';
import PortalButton from '../../button';

interface PinPadProps {
  label: string;
  onSubmit: () => void | Promise<void>;
  pinLength: number;
  setPin: Dispatch<SetStateAction<string>>;
}

const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'];
const { width } = Dimensions.get('window');
const keySize = width / 5; // Make sure to use the correct width
const keyTextSize = keySize / 2.5;

const PinPad: FC<PinPadProps> = ({ label, onSubmit, pinLength, setPin }) => {
  const [code, setCode] = useState<string[]>([]);

  const handlePress = (item: string) => {
    if (item === 'del') {
      setCode(prev => prev.slice(0, -1));
    } else if (item !== '' && code.length < pinLength) {
      setCode(prev => [...prev, item]);
    }
  };

  useEffect(() => {
    if (code) {
      setPin(code.join(''));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'flex-end',
          flexDirection: 'row',
          gap: 40,
          height: keySize * 2,
          justifyContent: 'center',
          marginBottom: 60,
        }}
      >
        {typeof code !== 'undefined'
          ? code.map((_, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: 'black',
                  borderRadius: keySize,
                  height: keySize / 4,
                  width: keySize / 4,
                }}
              />
            ))
          : null}
      </View>
      <FlatList
        columnWrapperStyle={{ gap: 20 }}
        contentContainerStyle={{ gap: 20 }}
        data={keys}
        keyExtractor={(_, index) => index.toString()}
        numColumns={3}
        renderItem={item => (
          <TouchableOpacity onPress={() => handlePress(item.item as string)}>
            <View
              style={{
                alignItems: 'center',
                borderColor: code.length < pinLength ? 'black' : 'lightgray',
                borderRadius: keySize,
                borderWidth: ['', 'del'].includes(item.item as string) ? 0 : 1,
                height: keySize,
                justifyContent: 'center',
                width: keySize,
              }}
            >
              {item.item === 'del' ? (
                <Text style={{ color: 'black', fontSize: keyTextSize }}>
                  {'<'}
                </Text>
              ) : (
                <Text
                  style={{
                    color: code.length < pinLength ? 'black' : 'lightgray',
                    fontSize: keyTextSize,
                  }}
                >
                  {item.item}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        )}
        scrollEnabled={false}
        style={{ backgroundColor: 'white', flexGrow: 0 }}
      />

      {typeof code !== 'undefined' && code.length === pinLength ? (
        <View style={styles.section}>
          <PortalButton title={label} onPress={onSubmit} />
        </View>
      ) : null}
    </View>
  );
};

export default PinPad;
