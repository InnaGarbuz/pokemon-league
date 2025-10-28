import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonCardComponent } from '@app/components/pokemon-card/pokemon-card.component';
import { PokemonListComponent } from '@app/components/pokemon-list/pokemon-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PokemonListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pokemon-league';
}
