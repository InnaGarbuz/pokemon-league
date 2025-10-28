import { Component, inject, OnInit } from '@angular/core';
import { PokemonCardComponent } from '@app/components/pokemon-card/pokemon-card.component';
import { TournamentPokemon } from '@app/core/models/pokemon';
import { PokemonService } from '@app/core/services/pokemon.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent, FormsModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit {

  public sortBy: keyof TournamentPokemon = 'wins';
  public sortDir: 'asc' | 'desc' = 'desc';

  private _pokemonService: PokemonService = inject(PokemonService);

  private _pokemonSubject: BehaviorSubject<TournamentPokemon[]> = new BehaviorSubject<TournamentPokemon[]>([]);
  public pokemons$: Observable<TournamentPokemon[]> = this._pokemonSubject.asObservable().pipe(
      map(pokemons => this.sortArray(pokemons))
  );

  ngOnInit() {
   this.loadPokemons()
  }

  public loadPokemons() {
    this._pokemonService.getUniqueRandomPokemons().subscribe(pokemons => {
      this._pokemonSubject.next(pokemons);
    });
  }

  public sortArray(pokemons: TournamentPokemon[]): TournamentPokemon[] {
    return [...pokemons].sort((a,b) => {
          const valueA = a[this.sortBy];
          const valueB = b[this.sortBy];


          let diff = 0;

         if (typeof valueA === 'string' && typeof valueB === 'string') {
           diff = valueA.localeCompare(valueB)
         } else if (typeof valueA === 'number' && typeof valueB === 'number') {
           diff = valueA - valueB
         }

         return this.sortDir === 'asc' ? diff : -diff;
    });
  }

  public onSortChange() {
    this._pokemonSubject.next(this._pokemonSubject.value);
  }

  public trackById(index: number, pokemon: TournamentPokemon) {
    return pokemon.id;
  }

  public nextPokemon() {
    this.loadPokemons();
  }

}
