import {View, Text, StyleSheet, Platform, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import  Icon  from 'react-native-vector-icons/Ionicons';


interface Props {
    style?: StyleProp<ViewStyle>
}

export const SearchInput = ({style}:Props) => {
  return (
    <View style={{...styles.container, ...style as any}}>
      <View style={styles.textBackground}>
        <TextInput
          style={{...styles.textInput, top: (Platform.OS==='ios') ? 0: 2}}
          placeholder="Search pokemon"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Icon 
        name='search' 
        color={'grey'}
        size={30}
        
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
  textBackground: {
    backgroundColor: '#F3F1F3',
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    
    elevation: 2,
  },
  textInput: {
    flex: 1,
    fontSize: 18,

  },
});
