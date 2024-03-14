import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalMarkdownRendererComponent } from './legal-markdown-renderer.component';

describe('LegalMarkdownRendererComponent', () => {
  let component: LegalMarkdownRendererComponent;
  let fixture: ComponentFixture<LegalMarkdownRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalMarkdownRendererComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LegalMarkdownRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
