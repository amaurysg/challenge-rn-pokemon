import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {FullPokemon} from '../interfaces/pokemonInterfaces';
import {FlatList} from 'react-native-gesture-handler';
import {FadeInImage} from './FadeInImage';

interface Props {
  pokemon: FullPokemon;
}
export default function PokemonDetails({pokemon}: Props) {
  return (
    <ScrollView
      style={{...StyleSheet.absoluteFillObject}}
      showsVerticalScrollIndicator={false}>
      <View style={{...styles.container, marginTop: 370}}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{...styles.container, marginTop: 20}}>
          <FadeInImage
            uri={pokemon.sprites.front_default}
            style={styles.basicSprites}
          />
          <FadeInImage
            uri={pokemon.sprites.back_default}
            style={styles.basicSprites}
          />
          <FadeInImage
            uri={pokemon.sprites.front_shiny}
            style={styles.basicSprites}
          />
          <FadeInImage
            uri={pokemon.sprites.back_shiny}
            style={styles.basicSprites}
          />
        </ScrollView>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 20,
          }}>
          <View>
            <Text style={{...styles.typesTitle}}>Type:</Text>
            <View style={{flexDirection: 'row'}}>
              {pokemon.types.map(({type}) => (
                <Text style={{...styles.regularText, marginRight: 5}}>
                  {type.name}
                </Text>
              ))}
            </View>
            <Text style={styles.typesTitle}>Weight:</Text>
            <Text style={styles.regularText}>{pokemon.weight}kg</Text>
          </View>
          <View>
            <FadeInImage
              uri={pokemon.sprites.other?.home.front_default!}
              style={styles.basicSprites3D}
            />
          </View>
        </View>
      </View>

      <View style={{marginHorizontal: 20}}>
        <View style={{...styles.container}}>
          <Text style={{...styles.typesTitle, marginTop: 0}}>Abilitys:</Text>
          <View style={{flexDirection: 'row'}}>
            {pokemon.abilities.map(({ability}) => (
              <Text style={{...styles.regularText, marginRight: 5}}>
                {ability.name}
              </Text>
            ))}
          </View>
        </View>

        <View style={{...styles.container}}>
          <Text style={{...styles.typesTitle, marginTop: 20}}>Stats:</Text>
          <View>
            {pokemon.stats.map((stat, i) => (
              <View
                key={stat.stat.name + i}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderWidth: 1,
                  borderRadius: 10,
                  marginBottom: 3,
                  padding: 2,
                }}>
                <Text style={{...styles.regularText, marginRight: 5}}>
                  {stat.stat.name}
                </Text>
                <Text
                  style={{
                    ...styles.regularText,
                    marginRight: 5,
                    fontWeight: 'bold',
                  }}>
                  {stat.base_stat}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View>
        <FadeInImage
          uri={pokemon.sprites.back_default}
          style={{...styles.basicSprites}}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    //marginHorizontal: 20,
  },
  typesTitle: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontSize: 22,
    marginTop: 20,
  },
  regularText: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
  basicSprites: {
    width: 100,
    height: 100,
  },
  basicSprites3D: {
    width: 150,
    height: 150,
  },
});
