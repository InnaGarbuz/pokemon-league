import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { TournamentPokemon, TYPE_ADVANTAGE } from '@app/core/models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private API: string = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) { }

  // ------ Generates unique random ------
  generateUniqueIds(count: number, min: number, max: number): number[] {
    const ids = new Set<number>();
    while (ids.size < count) {
      const random = Math.floor(Math.random() * (max - min + 1)) + min;
      ids.add(random);
    }
    return [...ids];
  }

  // ------ get Unique Random Pokemons ------
  getUniqueRandomPokemons(): Observable<TournamentPokemon[]> {
    const ids = this.generateUniqueIds(16, 1, 151 );
    
    const requests =
        ids.map(id => this.http.get<any>(`${this.API}${id}`))

    return forkJoin(requests).pipe(
        map(data => {
          const pokemons: TournamentPokemon[] = data.map(pokemon => ({
            id: pokemon.id,
            name: pokemon.name,
            type: pokemon.types[0].type.name,
            baseExperience: pokemon.baseExperience,
            wins: 0,
            losses: 0,
            ties: 0,
            winRate: 0,
            image: pokemon.sprites.other['official-artwork'].front_default
          }))

          return this.simulateTournament(pokemons)
        })
    )
  }

// ------ simulate Tournament ------
  simulateTournament(pokemons: TournamentPokemon[]): TournamentPokemon[] {
    const beats = TYPE_ADVANTAGE;

    for (let i = 0; i < pokemons.length; i++) {
      for (let j = i + 1; j < pokemons.length; j++) {
        const pok1 = pokemons[i];
        const pok2 = pokemons[j];

        let winner: TournamentPokemon | null = null;

        if(beats[pok1.type] === pok2.type) {
          winner = pok1;
        } else if (beats[pok2.type] === pok1.type) {
          winner = pok2;
        } else if (pok1.baseExperience > pok2.baseExperience) {
          winner = pok1;
        } else if(pok2.baseExperience > pok1.baseExperience){
          winner = pok2;
        }

        if(!winner) {
          pok1.ties++;
          pok2.ties++
        } else if( winner === pok1) {
          pok1.wins++;
          pok2.losses++;
        } else {
          pok2.wins++;
          pok1.losses++;
        }
      }
    }

    this.updateWinRates(pokemons);

    return pokemons;
  }

  // ------ update Win Rates ------
  updateWinRates(pokemons: TournamentPokemon[]) {
    pokemons.forEach(pokemon => {
      const totalBattles = pokemon.wins + pokemon.losses + pokemon.ties;
      pokemon.winRate = totalBattles ? +(pokemon.wins / totalBattles * 100).toFixed(2) : 0;
    })
  }


}
