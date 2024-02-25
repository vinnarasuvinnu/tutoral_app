import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekmeetComponent } from './weekmeet.component';

describe('WeekmeetComponent', () => {
  let component: WeekmeetComponent;
  let fixture: ComponentFixture<WeekmeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekmeetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekmeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
