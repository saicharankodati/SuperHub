import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { IndexedDBService } from '../../services/indexeddb.service';

@Component({
  standalone: true,
  selector: 'app-sign-in',
  imports: [CommonModule, RouterLink],
  templateUrl: './sign-in.html',
  styleUrls: ['./sign-in.scss']
})
export class SignIn implements OnInit, OnDestroy {
  private router = inject(Router);
  private indexedDBService = inject(IndexedDBService);

  ngOnInit() {
  }

  handleSignIn() {
    this.indexedDBService.set('userContext', { id: 1, name: 'John Doe', email: 'john.doe@example.com' });
    this.router.navigate(['/dashboard']);
  }

  ngOnDestroy() {
    this.indexedDBService.clearSignals();
  }
}
