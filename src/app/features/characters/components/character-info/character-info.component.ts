import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/app/shared/models/rick-api.models';

@Component({
  selector: 'app-character-info',
  templateUrl: './character-info.component.html',
  styleUrls: ['./character-info.component.scss'],
})
export class CharacterInfoComponent implements OnInit {
  @Input()
  character!: Character;

  constructor() {}

  ngOnInit(): void {}
}
