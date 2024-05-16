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
import { SortText, SortValue } from '../../../../enums/sort.enums';

@Component({
  selector: 'app-courses-filter',
  standalone: true,
  imports: [ReactiveFormsModule, MatIcon, FormsModule],
  templateUrl: './courses-filter.component.html',
  styleUrls: ['./courses-filter.component.scss'],
})
export class CoursesFilterComponent implements OnInit {
  filterForm: FormGroup;
  currentSort: SortValue;
  isDropdownOpen: boolean = false;
  protected readonly Sort = SortValue;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.filterForm = new FormGroup({
      searchTerm: new FormControl(''),
      sortBy: new FormControl(SortValue.latest),
    });
    this.currentSort = SortValue.latest;
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      const sortParam = params['sort'] as SortValue;
      const searchParam = params['search'] as string;

      if (sortParam && SortValue[sortParam] !== undefined) {
        this.currentSort = sortParam;
        this.filterForm
          .get('sortBy')
          ?.setValue(this.currentSort, { emitEvent: false });
      }

      if (searchParam) {
        this.filterForm
          .get('searchTerm')
          ?.setValue(searchParam, { emitEvent: false });
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

  setSortBy(sortBy: SortValue): void {
    this.currentSort = sortBy;
    const sortByControl = this.filterForm.get('sortBy');
    if (sortByControl) {
      sortByControl.setValue(sortBy, { emitEvent: true });
    }
    this.closeDropdown();
  }

  getSortText(): string {
    return SortText[this.currentSort];
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }
}
