import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { MatIcon } from '@angular/material/icon';
import { Sort, SortText } from '../../../../enums/sort.enum';

@Component({
  selector: 'app-courses-filter',
  standalone: true,
  imports: [ReactiveFormsModule, MatIcon, FormsModule],
  templateUrl: './courses-filter.component.html',
  styleUrls: ['./courses-filter.component.scss'],
})
export class CoursesFilterComponent implements OnInit {
  filterForm: FormGroup;
  currentSort: Sort;
  protected readonly Sort = Sort;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.filterForm = new FormGroup({
      searchTerm: new FormControl(''),
      sortBy: new FormControl(Sort.latest),
    });
    this.currentSort = Sort.latest;
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      const sortParam = params['sort'] as Sort;
      if (sortParam && Sort[sortParam] !== undefined) {
        this.currentSort = sortParam;
        this.filterForm
          .get('sortBy')
          ?.setValue(this.currentSort, { emitEvent: false });
      }
    });

    this.filterForm.valueChanges.pipe(debounceTime(300)).subscribe((val) => {
      this.router.navigate([], {
        queryParams: {
          search: val.searchTerm || null,
          sort: val.sortBy || null,
        },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
    });
  }

  setSortBy(sortBy: Sort): void {
    this.currentSort = sortBy;
    const sortByControl = this.filterForm.get('sortBy');
    if (sortByControl) {
      sortByControl.setValue(sortBy, { emitEvent: true });
    }
  }

  getSortText(): string {
    return SortText[this.currentSort];
  }
}
