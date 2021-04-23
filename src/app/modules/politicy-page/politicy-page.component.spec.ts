import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticyPageComponent } from './politicy-page.component';

describe('PoliticyPageComponent', () => {
  let component: PoliticyPageComponent;
  let fixture: ComponentFixture<PoliticyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliticyPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
