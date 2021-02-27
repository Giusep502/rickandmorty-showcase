import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { HandleNullPipe } from './pipes/handle-null.pipe';

@NgModule({
  declarations: [PaginatorComponent, HandleNullPipe],
  imports: [CommonModule],
  exports: [HandleNullPipe, PaginatorComponent],
})
export class SharedModule {}
