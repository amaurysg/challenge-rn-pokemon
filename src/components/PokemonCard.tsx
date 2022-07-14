import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';
import ImageColors from 'react-native-image-colors';
import {
  useNavigation,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../navigation/Tab1';

interface Props {
  pokemon: SimplePokemon;
}
const {width: windowWidth} = Dimensions.get('window');
export const PokemonCard = ({pokemon}: Props) => {
  const [bgColor, setBgColor] = useState('grey');
  const isMountend = useRef(true);
  const {navigate} = useNavigation<StackNavigationProp<RootStackParams>>();
  useEffect(() => {
    ImageColors.getColors(pokemon.picture, {fallback: 'grey'}).then(
      (colors: any) => {
        if (!isMountend.current) return;
        colors.platform === 'android'
          ? setBgColor(colors.dominant || 'grey')
          : setBgColor(colors.background || 'grey');
      },
    );
    return () => {
      //when dismount componet
      isMountend.current = false;
    };
  }, []);

  return (
    <TouchableOpacity
      onPress={() =>
        navigate('PokemonScreen', {simplePokemon: pokemon, color: bgColor})
      }>
      <View
        style={{
          ...styles.cardContainer,
          width: windowWidth * 0.28,
          backgroundColor: bgColor,
        }}>
        <FadeInImage uri={pokemon.picture} style={styles.pokemonImage} />

        <View style={styles.pokemonDataContainer}>
          <View
            style={styles.nameContainer}>
            <Text style={styles.name}>{pokemon.name}</Text>
          </View>

          <View style={styles.pokemonId}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              {pokemon.id}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    height: 140,
    width: 160,
    alignContent: 'center',
    textAlign: 'center',
    marginBottom: 40,
    borderRadius: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  pokemonImage: {
    width: 110,
    height: 110,
    position: 'absolute',
    top: -20,
  },
  pokemonDataContainer: {
    top: 70,
    alignItems: 'center',
  },
  nameContainer:{
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  name: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },

  pokemonId: {
    borderWidth: 2,
    borderRadius: 50,
    width: 32,
    height: 32,
    alignContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    justifyContent: 'center',
    marginTop:5

  },
});
