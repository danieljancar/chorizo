import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalOverviewComponent } from './legal-overview.component';

describe('LegalOverviewComponent', () => {
  let component: LegalOverviewComponent;
  let fixture: ComponentFixture<LegalOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LegalOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
