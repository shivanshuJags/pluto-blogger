import { Component } from '@angular/core'; import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showLayout: boolean = true;
  showFooter: boolean = false;
  title: string = 'plutoblogger';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const hiddenRoutes = ['/login'];
        this.showLayout = !hiddenRoutes.includes(event.urlAfterRedirects);
        if (['/my-profile'].includes(event.urlAfterRedirects)) {
          this.showFooter = false;
        } else {
          this.showFooter = true;
        }
      });
  }
}
