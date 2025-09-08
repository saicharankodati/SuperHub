import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router, Event, NavigationStart } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  private router = inject(Router);

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        switch(event.url) {
          case '/sign-in':
            this.router.navigate([`/auth${event.url}`]);
            break;
          case '/sign-up':
            this.router.navigate([`/auth${event.url}`]);
            break;
          default:
            break;
        }
      }
    });
    setTimeout(() => {
      var appDiv = document.querySelector('div.app') as HTMLElement;
      if(appDiv) {
        appDiv.classList.add('active');
      }
      var logobgImg = document.querySelector('img.logo-bg') as HTMLElement;
      if(logobgImg) {
        logobgImg.classList.add('spin');
      }
      var shellNav = document.querySelector('nav.shell') as HTMLElement;
      if(shellNav) {
        shellNav.classList.add('active');
      }
    }, 100);
  }

  activateGetStarted() {
    return this.router.url.startsWith('/auth') ? '' : this.router.url.startsWith('/dashboard') ? '' : 'active';
  }

  getStarted() {
  }

  activateWrapItUp() {
    return this.router.url.startsWith('/dashboard') ? 'active' : '';
  }

  wrapItUp() {
  }
}
