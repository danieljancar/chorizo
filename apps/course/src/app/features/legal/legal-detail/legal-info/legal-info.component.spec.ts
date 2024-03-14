import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalInfoComponent } from './legal-info.component';

describe('LegalInfoComponent', () => {
  let component: LegalInfoComponent;
  let fixture: ComponentFixture<LegalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LegalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
