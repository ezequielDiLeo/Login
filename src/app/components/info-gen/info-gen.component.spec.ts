import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoGenComponent } from './info-gen.component';

describe('InfoGenComponent', () => {
  let component: InfoGenComponent;
  let fixture: ComponentFixture<InfoGenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoGenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
