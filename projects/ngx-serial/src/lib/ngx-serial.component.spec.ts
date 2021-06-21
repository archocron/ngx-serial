import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSerialComponent } from './ngx-serial.component';

describe('NgxSerialComponent', () => {
  let component: NgxSerialComponent;
  let fixture: ComponentFixture<NgxSerialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxSerialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSerialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
