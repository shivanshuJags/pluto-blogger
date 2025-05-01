import { Component } from '@angular/core';
import { BlogListComponent } from '../blog-list/blog-list.component';
import { BlogCardComponent } from '../blog-card/blog-card.component';

@Component({
  selector: 'app-home-layout',
  imports: [BlogListComponent, BlogCardComponent],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.css'
})
export class HomeLayoutComponent {

}
