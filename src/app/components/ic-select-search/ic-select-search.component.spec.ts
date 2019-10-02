import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcSelectSearchComponent } from './ic-select-search.component';

describe('IcSelectSearchComponent', () => {
  let component: IcSelectSearchComponent;
  let fixture: ComponentFixture<IcSelectSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcSelectSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcSelectSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
