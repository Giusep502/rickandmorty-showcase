import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ExtendedCharacter } from 'src/app/core/store';

@Component({
  selector: 'app-character-info',
  templateUrl: './character-info.component.html',
  styleUrls: ['./character-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterInfoComponent implements OnInit {
  @Input()
  character!: ExtendedCharacter;

  maxEpisodes = 4;

  constructor() {}

  ngOnInit(): void {}

  showMoreEpisodes(): void {
    this.maxEpisodes += 4;
  }
}
