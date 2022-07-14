import React from 'react';
import {ActivityIndicator, FlatList, Image, Text, View} from 'react-native';
import {PokemonCard} from '../components/PokemonCard';
import {usePokemonPaginated} from '../hooks/usePokemonPaginated';

export const HomeScreen = () => {
  const {simplePokemonList, loadPokemons} = usePokemonPaginated();

  return (
    <View>

      <View style={{alignItems: 'center'}}>
        <FlatList
          data={simplePokemonList}
          keyExtractor={pokemon => pokemon.id.toString()}
          renderItem={({item}) => <PokemonCard pokemon={item} />}
          //header
          ListHeaderComponent={() => (
              <View  >
                <Image
                  source={require('../assets/poke_header.svg.png')}
                  style={{height: 70, width: 70}}
                />
              </View>
          )}
          numColumns={3}
          //infinite Scroll
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            <ActivityIndicator size={'small'} color={'grey'} />
          }
        />
      </View>
    </View>
  );
};
