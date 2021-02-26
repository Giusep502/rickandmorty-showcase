import { Component, Input, OnInit } from '@angular/core';
import { ExtendedCharacter } from 'src/app/core/store';

@Component({
  selector: 'app-character-info',
  templateUrl: './character-info.component.html',
  styleUrls: ['./character-info.component.scss'],
})
export class CharacterInfoComponent implements OnInit {
  @Input()
  character!: ExtendedCharacter;

  constructor() {}

  ngOnInit(): void {}
}
