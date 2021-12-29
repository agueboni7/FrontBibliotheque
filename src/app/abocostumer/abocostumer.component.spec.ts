import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbocostumerComponent } from './abocostumer.component';

describe('AbocostumerComponent', () => {
  let component: AbocostumerComponent;
  let fixture: ComponentFixture<AbocostumerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbocostumerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbocostumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
