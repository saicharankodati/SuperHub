import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { IndexedDBService } from '../../services/indexeddb.service';

@Component({
  standalone: true,
  selector: 'app-sign-in',
  imports: [CommonModule, RouterLink],
  templateUrl: './sign-in.html',
  styleUrls: ['./sign-in.scss']
})
export class SignIn {
  private indexedDBService = inject(IndexedDBService);
  private router = inject(Router);

  handleSignIn() {
    this.indexedDBService.set('userContext', { id: 1, name: 'John Doe', email: 'john.doe@example.com' });
    this.router.navigate(['/dashboard']);
  }
}
