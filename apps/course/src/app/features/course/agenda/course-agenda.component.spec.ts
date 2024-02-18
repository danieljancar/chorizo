import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAgendaComponent } from './course-agenda.component';

describe('AgendaComponent', () => {
  let component: CourseAgendaComponent;
  let fixture: ComponentFixture<CourseAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseAgendaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
