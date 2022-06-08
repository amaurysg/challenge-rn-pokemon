import {
  View,
  Text,
  Platform,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SearchInput} from '../components/SearchInput';
import {usePokemon} from '../hooks/usePokemon';
import {usePokemonSearch} from '../hooks/usePokemonSearch';
import {PokemonCard} from '../components/PokemonCard';
import {Loading} from '../components/Loading';
import {styles} from '../theme/appTheme';

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {
  const {top} = useSafeAreaInsets();
  const {simplePokemonList, isFetching} = usePokemonSearch();

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View
      style={{
        flex: 1,
        /*  marginTop: Platform.OS === 'ios' ? top : top + 10, */
        marginHorizontal: 20,
      }}>
      <SearchInput
        style={{
          position: 'absolute',
          zIndex: 999,
          width: screenWidth - 40,
          top: Platform.OS === 'ios' ? top : top + 10,
        }}
      />
      <FlatList
        data={simplePokemonList}
        keyExtractor={pokemon => pokemon.id.toString()}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        //header
        ListHeaderComponent={() => (
          <Text
            style={{
              ...styles.globalMargin,
              ...styles.title,
              marginBottom: 20,
              marginTop: (Platform.OS === 'ios') ? top + 60 : top + 80,
            }}>
            PokeDex
          </Text>
        )}
        numColumns={2}
        //infinite Scroll
      />
    </View>
  );
};
