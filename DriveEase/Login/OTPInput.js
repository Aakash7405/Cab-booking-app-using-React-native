import React, {useRef, useState} from 'react';
import {View, Text, TextInput, StyleSheet, Pressable} from 'react-native';

export default function OTPInput({code, setCode, maxLen, setIsPinReady}) {
  const boxArray = new Array(maxLen).fill(0);
  const inputRef = useRef(null);
  const [isPressed, setPressed] = useState(false);
  const handleFocus = () => {
    setPressed(true);
    inputRef.current.focus();
  };
  const handleBlur = () => {
    setPressed(false);
  };
  const boxDigit = (_, index) => {
    const emptyInput = '';
    const digit = code[index] || emptyInput;

    // eslint-disable-next-line no-lone-blocks
    return index === code.length ? (
      <View key={index} style={styles.inputBox}>
        <Text style={styles.inputBoxText}>{digit}</Text>
      </View>
    ) : (
      <View key={index} style={styles.inputBoxOnFocus}>
        <Text style={styles.inputBoxText}>{digit}</Text>
      </View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <Pressable
        style={styles.inputBoxContainer}
        onFocus={handleFocus}
        onBlur={handleBlur}>
        {boxArray.map(boxDigit)}
      </Pressable>
      <TextInput
        style={styles.hiddenInputContainer}
        value={code}
        maxLength={maxLen}
        ref={inputRef}
        onChangeText={setCode}
        keyboardType="numeric"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  hiddenInputContainer: {
    height: 10,
    width: '90%',
    borderColor: '#e5e5e5',
    borderRadius: 5,
    padding: 15,
    position:'absolute',
    opacity:0,
  },
  inputBoxContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  inputBox: {
    borderWidth: 1,
    height: 50,
    width: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ec7c0c',
  },
  inputBoxText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
  },
  inputBoxOnFocus: {
    borderWidth: 1,
    height: 50,
    width: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
