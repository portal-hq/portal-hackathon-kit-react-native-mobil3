import React, { FC, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { styles } from '../../../style/stylesheet';
import Clipboard from '@react-native-clipboard/clipboard';

interface CopyableTextProps {
  value: string;
  label?: string;
  maxDisplayLength?: number;
}

const CopyableText: FC<CopyableTextProps> = ({
  value,
  label,
  maxDisplayLength,
}) => {
  const [copied, setCopied] = useState(false);

  // Display full string or truncated version with ellipsis
  const displayText =
    maxDisplayLength && value.length > maxDisplayLength
      ? `${value.substring(0, maxDisplayLength / 2)}...${value.substring(
          value.length - maxDisplayLength / 2,
        )}`
      : value;

  const copyToClipboard = () => {
    Clipboard.setString(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View style={localStyles.container}>
      {label && <Text style={styles.formLabel}>{label}</Text>}
      <TouchableOpacity
        onPress={copyToClipboard}
        style={localStyles.copyContainer}
      >
        <Text selectable style={localStyles.text}>
          {displayText}
        </Text>
        <View style={localStyles.copyButton}>
          <Text style={localStyles.copyButtonText}>
            {copied ? '✓ Copied' : 'Copy'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
  copyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 4,
  },
  text: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    paddingRight: 8,
  },
  copyButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  copyButtonText: {
    fontSize: 12,
    color: '#555',
    fontWeight: 'bold',
  },
});

export default CopyableText;
