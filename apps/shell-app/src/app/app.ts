import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, Router, Event, NavigationStart } from '@angular/router';
import { IndexedDBService } from './services/indexeddb.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit, OnDestroy {
  private router = inject(Router);
  private indexedDBService = inject(IndexedDBService);

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
    }, 300);
  }

  goToWebsite() {
    var signoutBtn = document.querySelector('#nav-signout') as HTMLElement;
    if(signoutBtn) {
      signoutBtn.classList.remove('active');
    }
    var component = document.querySelector('div.component') as HTMLElement;
    if(component) {
      component.classList.remove('active');
    }
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 300);
  }

  goToApplication() {
    var getStartedBtn = document.querySelector('#nav-get-started') as HTMLElement;
    if(getStartedBtn) {
      getStartedBtn.classList.remove('active');
    }
    setTimeout(() => {
      this.router.navigate(['/auth']);
    }, 300);
  }

  handleSignOut() {
    var signoutBtn = document.querySelector('#nav-signout') as HTMLElement;
    if(signoutBtn) {
      signoutBtn.classList.remove('active');
    }
    this.indexedDBService.clear('userContext');
    setTimeout(() => {
      this.router.navigate(['/auth']);
    }, 300);
  }

  ngOnDestroy() {
    this.indexedDBService.clearSignals();
  }
}
