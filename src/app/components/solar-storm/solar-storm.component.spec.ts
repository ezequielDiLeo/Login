import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarStormComponent } from './solar-storm.component';

describe('SolarStormComponent', () => {
  let component: SolarStormComponent;
  let fixture: ComponentFixture<SolarStormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolarStormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolarStormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
