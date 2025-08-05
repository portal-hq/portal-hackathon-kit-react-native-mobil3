import { FC } from 'react';
import { StyleProp, Text, TouchableOpacity, ViewStyle } from 'react-native';

interface ButtonProps {
  color?: string;
  disabled?: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textColor?: string;
  title: string;
}

const PortalButton: FC<ButtonProps> = ({
  color = '#007BFF', // Blue default
  disabled = false,
  onPress,
  style = {},
  textColor = '#FFF', // White text
  title,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        {
          alignItems: 'center',
          backgroundColor: disabled ? 'gray' : color,
          borderRadius: 5,
          paddingHorizontal: 10,
          paddingVertical: 15,
          opacity: disabled ? 0.7 : 1,
        },
        style,
      ]}
    >
      <Text
        style={{
          color: textColor,
          fontWeight: 'bold',
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default PortalButton;
