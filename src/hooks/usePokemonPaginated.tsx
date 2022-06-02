import {useEffect, useRef, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {
  PokemonPaginatedResponse,
  Result,
  SimplePokemon,
} from '../interfaces/pokemonInterfaces';

export const usePokemonPaginated = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  );

  //useRef to keep current data
  const nextPageUrl = useRef(`https://pokeapi.co/api/v2/pokemon/?limit=40`);

  const loadPokemons = async () => {
    setIsLoading(true)
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(
      nextPageUrl.current,
    );
    //here load the next page
    nextPageUrl.current = resp.data.next;
    mapPokemonList(resp.data.results);
    //console.log(resp.data)
  };

  const mapPokemonList = (pokemonList: Result[]) => {
    const newPokemonList: SimplePokemon[] = pokemonList.map(({name, url}) => {
      //https://pokeapi.co/api/v2/pokemon/15/
      const urlParts = url.split('/');
      //here convert url to array
      //['https:', '', 'pokeapi.co', 'api', 'v2', 'pokemon', '15', '']
      //here we need the position urlParts.length - 2
      const id = urlParts[urlParts.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      return {id, picture, name};
    });
    setSimplePokemonList([...simplePokemonList, ...newPokemonList]);
    setIsLoading(false)
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return {
      isLoading,
    simplePokemonList,
  };
};
