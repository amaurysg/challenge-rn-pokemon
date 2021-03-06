import {View, StyleSheet, Platform, StyleProp, ViewStyle} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import useDebounce from '../hooks/useDebounce';

interface Props {
  onDebounced: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

export const SearchInput = ({style, onDebounced}: Props) => {
  const [textValue, setTextValue] = useState('');
  const debouncedValue = useDebounce(textValue);

  useEffect(() => {
    onDebounced(debouncedValue);
  }, [debouncedValue]);

  return (
    <View style={{...styles.container, ...(style as any)}}>
      <View style={styles.textBackground}>
        <TextInput
          style={{...styles.textInput, top: Platform.OS === 'ios' ? 0 : 2}}
          placeholder="Search your Pokémon"
          autoCapitalize="none"
          autoCorrect={false}
          value={textValue}
          onChangeText={setTextValue}
        />
        <Icon name="search" color={'grey'} size={30} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    /*  backgroundColor: 'red', */
  },
  textBackground: {
    backgroundColor: 'white',
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
  },
});
