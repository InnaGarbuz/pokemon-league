import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TournamentPokemon } from '@app/core/models/pokemon';
import { DecimalPipe, NgClass, NgOptimizedImage, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [
    TitleCasePipe,
    DecimalPipe,
    NgClass,
    NgOptimizedImage
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent {
  @Input() pokemon!: TournamentPokemon;
}
