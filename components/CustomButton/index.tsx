import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'solid' | 'outline';
  size?: 'sm' | 'md' | 'lg'; 
  disabled?: boolean
}

const CustomButton = ({
  title,
  onPress,
  variant = 'solid',
  size = 'md',
  disabled
}: ButtonProps) => {
  const isOutline = variant === 'outline';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isOutline ? styles.outlineButton : styles.solidButton,
        disabled && styles.disabledButton
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.text,
          isOutline ? styles.outlineText : styles.solidText,
          styles[`text_${size}`], 
          disabled && styles.disabledText
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    width: '100%',
    borderWidth: 2,
  },
  solidButton: {
    backgroundColor: '#EC6724',
    borderColor: '#EC6724',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderColor: '#EC6724',
  },

  text: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  solidText: {
    color: '#fff',
  },
  outlineText: {
    color: '#EC6724',
  },

  text_sm: {
    fontSize: 14,
  },  
  text_md: {
    fontSize: 18   ,
  },
  text_lg: {
    fontSize: 24,
  },
  disabledButton: {
      backgroundColor: '#888888',
      borderColor: '#888888'
  },
  disabledText: {
      color: '#7A7A7A'
  }
});

export default CustomButton;
