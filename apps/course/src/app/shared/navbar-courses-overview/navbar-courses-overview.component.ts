import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-navbar-courses-overview',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './navbar-courses-overview.component.html',
  styleUrl: './navbar-courses-overview.component.scss',
})
export class NavbarCoursesOverviewComponent {}
