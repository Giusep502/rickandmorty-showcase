import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  @Input()
  currentPage!: number;

  @Input()
  totalPages!: number;

  @Output()
  changePage = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}
}
