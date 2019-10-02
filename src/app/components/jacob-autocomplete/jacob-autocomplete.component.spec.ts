import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JacobAutocompleteComponent } from './jacob-autocomplete.component';

describe('JacobAutocompleteComponent', () => {
  let component: JacobAutocompleteComponent;
  let fixture: ComponentFixture<JacobAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JacobAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JacobAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
