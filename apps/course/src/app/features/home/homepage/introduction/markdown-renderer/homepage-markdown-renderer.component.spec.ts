import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageMarkdownRendererComponent } from './homepage-markdown-renderer.component';

describe('HomepageMarkdownRendererComponent', () => {
  let component: HomepageMarkdownRendererComponent;
  let fixture: ComponentFixture<HomepageMarkdownRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageMarkdownRendererComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomepageMarkdownRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
