import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from '../../utils/store/auth/auth.actions';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Output() tabChange = new EventEmitter<'profile' | 'drafts'>();
  constructor(private store: Store, private authService: AuthService){}

  selectTab(tab: 'profile' | 'drafts') {
    this.tabChange.emit(tab);
  }

  logout(): void {
      this.store.dispatch(logout());
      this.authService.logout();
    }

}
