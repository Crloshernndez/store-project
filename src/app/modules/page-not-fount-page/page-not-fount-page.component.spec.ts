import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFountPageComponent } from './page-not-fount-page.component';

describe('PageNotFountPageComponent', () => {
  let component: PageNotFountPageComponent;
  let fixture: ComponentFixture<PageNotFountPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageNotFountPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
