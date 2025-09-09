import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-sign-up',
  imports: [CommonModule],
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.scss']
})
export class SignUp implements OnInit {
  private router = inject(Router);

  ngOnInit() {
    setTimeout(() => {
      var signUpContainer = document.querySelector('div.component.signup-container');
      if (signUpContainer) {
        signUpContainer.classList.add('active');
      }
    }, 300);
  }
  
  handleSignUp() {
    var signUpContainer = document.querySelector('div.component.signup-container');
    if (signUpContainer) {
      signUpContainer.classList.remove('active');
    }
    // this.indexedDBService.set('userContext', { id: 1, name: 'John Doe', email: 'john.doe@example.com' });
    setTimeout(() => {
      this.router.navigate(['/sign-in']);
    }, 300);
  }

  goToSignIn() {
    var signUpContainer = document.querySelector('div.component.signup-container');
    if (signUpContainer) {
      signUpContainer.classList.remove('active');
    }
    setTimeout(() => {
      this.router.navigate(['/sign-in']);
    }, 300);
  }

}
