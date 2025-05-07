import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Output() tabChange = new EventEmitter<'profile' | 'drafts'>();

  selectTab(tab: 'profile' | 'drafts') {
    this.tabChange.emit(tab);
  }
}
