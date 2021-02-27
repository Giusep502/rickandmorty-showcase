import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginatorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should visualize next page if not last page', () => {
    component.currentPage = 1;
    component.totalPages = 2;
    fixture.detectChanges();
    const nextPage = fixture.debugElement.query(
      (element) => element.nativeElement.innerHTML === 'next page'
    );
    expect(nextPage).toBeTruthy();
    spyOn(component.changePage, 'emit');
    nextPage.nativeElement.click();
    expect(component.changePage.emit).toHaveBeenCalledWith(2);
  });

  it('should visualize previous page if not first page', () => {
    component.currentPage = 2;
    component.totalPages = 2;
    fixture.detectChanges();
    const nextPage = fixture.debugElement.query(
      (element) => element.nativeElement.innerHTML === 'previous page'
    );
    expect(nextPage).toBeTruthy();
    spyOn(component.changePage, 'emit');
    nextPage.nativeElement.click();
    expect(component.changePage.emit).toHaveBeenCalledWith(1);
  });

  it('should not visualize previous page if first page', () => {
    component.currentPage = 1;
    component.totalPages = 2;
    fixture.detectChanges();
    const nextPage = fixture.debugElement.query(
      (element) => element.nativeElement.innerHTML === 'previous page'
    );
    expect(nextPage).toBeFalsy();
  });

  it('should not visualize next page if last page', () => {
    component.currentPage = 2;
    component.totalPages = 2;
    fixture.detectChanges();
    const nextPage = fixture.debugElement.query(
      (element) => element.nativeElement.innerHTML === 'next page'
    );
    expect(nextPage).toBeFalsy();
  });
});
