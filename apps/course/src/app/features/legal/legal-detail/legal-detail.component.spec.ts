import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalDetailComponent } from './legal-detail.component';

describe('LegalDetailComponent', () => {
  let component: LegalDetailComponent;
  let fixture: ComponentFixture<LegalDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LegalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
