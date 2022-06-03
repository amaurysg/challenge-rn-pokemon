import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {FadeInImage} from '../components/FadeInImage';
import {usePokemon} from '../hooks/usePokemon';
import {RootStackParams} from '../navigation/Navigator';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({navigation, route}: Props) => {
  const {simplePokemon, color} = route.params;
  const {id, name, picture} = simplePokemon;
  const {top} = useSafeAreaInsets();
  const {pokemon, isLoading} = usePokemon(id);
  

  console.log('info pokemon:::',  pokemon.sprites);
  return (
    <View style={{flex:1}}>
      <View style={{...styles.headerContainer, backgroundColor: color}}>
        <TouchableOpacity
          style={{...styles.backButton, top: top + 10}}
          onPress={() => navigation.popToTop()}>
          <Icon name="arrow-back-outline" color={'white'} size={30} />
        </TouchableOpacity>

        <Text style={{...styles.pokemonName, top: top + 40}}>
          {name + '\n'} #{id}
        </Text>

        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={styles.pokeball}
        />
        <FadeInImage uri={picture} style={styles.imagePokemon} />
      </View>
      
      <View style={styles.loadingContainer}>
            <ActivityIndicator color={color} size={50}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 25,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  imagePokemon: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15,
  },
  loadingContainer:{
    flex:1, 
    justifyContent:'center',
    alignContent:'center',

  },
});
