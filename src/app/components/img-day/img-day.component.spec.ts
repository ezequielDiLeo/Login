import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgDayComponent } from './img-day.component';

describe('ImgDayComponent', () => {
  let component: ImgDayComponent;
  let fixture: ComponentFixture<ImgDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgDayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
