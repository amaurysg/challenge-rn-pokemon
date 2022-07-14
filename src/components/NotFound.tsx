import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Image} from 'react-native';

export const NotFound = (str: any) => {
  const myJSON = JSON.stringify(str.str);

  return (
    <View style={styles.activityContainer}>
      <Text style={styles.text}>Sorry, Pokémon {myJSON} not found...</Text>
      <Image style={styles.image} source={require('../assets/not-found.gif')} />
    </View>
  );
};

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 350,
    width: 350,
  },
  text: {
    fontSize: 18,
  },
});
