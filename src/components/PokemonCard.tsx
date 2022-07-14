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
  NavigationHelpersContext,
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
        <View>
          <Text style={styles.name}>{pokemon.name}</Text>
        </View>
        <Text style={styles.name}>{pokemon.id}</Text>
{/*         <View style={styles.pokebolaContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokebola}
          />
        </View> */}
      
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    //backgroundColor: 'orange',
    height: 160,
    width: 160,
    alignContent:'center',
    textAlign:'center',
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
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 800,
    borderBottomLeftRadius: 800,
  },
  name: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    top: 60,
    left: 12,
  
    textTransform: 'capitalize',
  },
  pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    /*   bottom: -20,
    right: -20,
    opacity: 0.5, */
    right: -25,
    bottom: -25,
  },
  pokemonImage: {
    width: 110,
    height: 110,
    position: 'absolute',
   /*  right: -8, */
    top: -20,
  },
  pokebolaContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    opacity: 0.5,
  },
});
