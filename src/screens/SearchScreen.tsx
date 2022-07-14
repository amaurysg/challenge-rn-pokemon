import {
  View,
  Text,
  Platform,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SearchInput} from '../components/SearchInput';
import {usePokemonSearch} from '../hooks/usePokemonSearch';
import {PokemonCard} from '../components/PokemonCard';
import {Loading} from '../components/Loading';
import {styles} from '../theme/appTheme';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {
  const {top} = useSafeAreaInsets();
  const {simplePokemonList, isFetching} = usePokemonSearch();

  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);
  const [term, setTerm] = useState('');
  const [notFound, setNotFound] = useState(false);




  useEffect(() => {
    if (term.length === 0 || term === '' ) {
      return setPokemonFiltered(simplePokemonList);
    } 
    if (isNaN(Number(term))) {

      setPokemonFiltered(
        simplePokemonList.filter(pokemon =>
          pokemon.name.toLocaleLowerCase().includes(term.toLocaleLowerCase()),
        ),
      )
      
      
    }
     else  {
      const pokemonById = simplePokemonList.find(
        pokemon => pokemon.id === term
      );
      setPokemonFiltered(pokemonById ? [pokemonById] : []);
    }
  }, [term, simplePokemonList]);

  if (isFetching) {
    return <Loading />;
  }


  return (
    <View
      style={{
        flex: 1,
        /*  marginTop: Platform.OS === 'ios' ? top : top = 10 */
       /*  marginHorizontal: 20, */
      }}>
      <SearchInput
        onDebounced={value => setTerm(value)}
        style={{
          position: 'absolute',
          zIndex: 999,
          marginHorizontal:20,
          width: screenWidth - 40,
          top: Platform.OS === 'ios' ? top : top + 10,
        }}
      />
      {/*   {true && <Loading/>} */}
          <FlatList
          data={pokemonFiltered}
          keyExtractor={pokemon => pokemon.id.toString()}
          renderItem={({item}) => <PokemonCard pokemon={item} />}
          //header
          ListHeaderComponent={() => (
            <Text
              style={{
                ...styles.globalMargin,
                ...styles.title,
                marginBottom: 20,
                textTransform:'capitalize',
                marginTop: Platform.OS === 'ios' ? top + 60 : top + 80,
              }}>
              {term}
            </Text>
          )}
          numColumns={3}
          //infinite Scroll
        />
        
      

    </View>
  );
};
