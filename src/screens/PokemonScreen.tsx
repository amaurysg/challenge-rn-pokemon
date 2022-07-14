import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {FadeInImage} from '../components/FadeInImage';
import PokemonDetails from '../components/PokemonDetails';
import {usePokemon} from '../hooks/usePokemon';
import {RootStackParams} from '../navigation/Tab1';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export const PokemonScreen = ({navigation, route}: Props) => {
  const {simplePokemon, color} = route.params;
  const {id, name, picture} = simplePokemon;
  const {top} = useSafeAreaInsets();
  const {pokemon, isLoading} = usePokemon(id);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          ...styles.headerContainer,
          backgroundColor: color,
        }}>
        <TouchableOpacity
          style={{...styles.backButton, top: top + 10}}
          onPress={() => navigation.popToTop()}>
          <Icon name="arrow-back-outline" color={'white'} size={30} />
        </TouchableOpacity>

        <Text style={{...styles.pokemonName, top: top + 50}}>{name}</Text>
        <View style={styles.pokemonId}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
            {id}
          </Text>
        </View>
        <FadeInImage uri={picture} style={styles.imagePokemon} />
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={color} size={50} />
        </View>
      ) : (
        <PokemonDetails pokemon={pokemon} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 330,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 50,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  pokemonId: {
    borderWidth: 2,
    borderRadius: 50,
    width: 42,
    height: 42,
    alignContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? 0 : -40,
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'center',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  imagePokemon: {
    width: 280,
    height: 280,
    position: 'absolute',
    bottom: -45,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
