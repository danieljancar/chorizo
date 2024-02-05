import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageAboutComponent } from './homepage-about.component';

describe('HomepageAboutComponent', () => {
  let component: HomepageAboutComponent;
  let fixture: ComponentFixture<HomepageAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageAboutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomepageAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
