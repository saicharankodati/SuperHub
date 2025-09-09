import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IndexedDBService } from '../../services/indexeddb.service';

@Component({
  standalone: true,
  selector: 'app-sign-in',
  imports: [CommonModule],
  templateUrl: './sign-in.html',
  styleUrls: ['./sign-in.scss']
})
export class SignIn implements OnInit, OnDestroy {
  private router = inject(Router);
  private indexedDBService = inject(IndexedDBService);

  ngOnInit() {
    setTimeout(() => {
      var signInContainer = document.querySelector('div.component.signin-container');
      if (signInContainer) {
        signInContainer.classList.add('active');
      }
    }, 300);
  }

  handleSignIn() {
    var signInContainer = document.querySelector('div.component.signin-container');
    if (signInContainer) {
      signInContainer.classList.remove('active');
    }
    this.indexedDBService.set('userContext', { id: 1, name: 'John Doe', email: 'john.doe@example.com' });
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 300);
  }

  goToSignUp() {
    var signInContainer = document.querySelector('div.component.signin-container');
    if (signInContainer) {
      signInContainer.classList.remove('active');
    }
    setTimeout(() => {
      this.router.navigate(['/sign-up']);
    }, 300);
  }

  ngOnDestroy() {
    this.indexedDBService.clearSignals();
  }
}
