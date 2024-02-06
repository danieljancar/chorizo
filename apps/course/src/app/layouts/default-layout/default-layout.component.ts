import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navigation/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/navigation/footer/footer.component';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  standalone: true,
  styles: [],
  imports: [NavbarComponent, RouterOutlet, FooterComponent],
})
export class DefaultLayoutComponent {}
