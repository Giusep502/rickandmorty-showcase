import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RickAndMortyApiService } from 'src/app/core/services/rick-and-morty-api.service';
import { Character } from 'src/app/shared/models/rick-api.models';

@Component({
  selector: 'app-character-list-page',
  templateUrl: './character-list-page.component.html',
  styleUrls: ['./character-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterListPageComponent implements OnInit {
  characters$: Observable<Character[]>;
  constructor(private rickAndMortyApi: RickAndMortyApiService) {
    this.characters$ = this.rickAndMortyApi
      .getCharacters({})
      .pipe(map((charactersResponse) => charactersResponse.results));
  }

  ngOnInit(): void {}
}
