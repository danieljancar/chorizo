import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageSubnavbarComponent } from './homepage-subnavbar.component';

describe('HomepageSubnavbarComponent', () => {
  let component: HomepageSubnavbarComponent;
  let fixture: ComponentFixture<HomepageSubnavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageSubnavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomepageSubnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
