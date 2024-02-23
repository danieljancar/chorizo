import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountProfileBannerComponent } from './account-profile-banner.component';

describe('AccountProfileBannerComponent', () => {
  let component: AccountProfileBannerComponent;
  let fixture: ComponentFixture<AccountProfileBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountProfileBannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountProfileBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
