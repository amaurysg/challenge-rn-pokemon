import React from 'react';
import {ActivityIndicator, FlatList, Image, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { FadeInImage } from '../components/FadeInImage';
import { PokemonCard } from '../components/PokemonCard';
import {usePokemonPaginated} from '../hooks/usePokemonPaginated';
import {styles} from '../theme/appTheme';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {simplePokemonList, loadPokemons} = usePokemonPaginated();


  return (
    <View>
      <Image
        source={require('../assets/pokebola.png')}
        style={styles.pokebolaBG}
      />
      {/*     <Text style={{...styles.title, ...styles.globalMargin, top: top}}>
        Home screen
      </Text> */}

      <View style={{alignItems:'center'}}>
          <FlatList
            data={simplePokemonList}
            keyExtractor={pokemon => pokemon.id.toString()}
            renderItem={({item}) => <PokemonCard pokemon={item}/>}
            //header
            ListHeaderComponent={()=>  <Text style={{...styles.title, ...styles.globalMargin, top:top, marginBottom:top }}>
            Home screen
          </Text>}
            numColumns={2}
            //infinite Scroll
            onEndReached={loadPokemons}
            onEndReachedThreshold={0.4}
            ListFooterComponent={<ActivityIndicator size={'small'} color={'grey'}/>}
          />
      </View>
    </View>
  );
};
