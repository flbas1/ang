import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SudukuBoxComponent } from './suduku-box.component';

describe('SudukuBoxComponent', () => {
  let component: SudukuBoxComponent;
  let fixture: ComponentFixture<SudukuBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SudukuBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SudukuBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
