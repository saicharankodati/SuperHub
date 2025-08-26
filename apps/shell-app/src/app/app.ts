import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router, Event, NavigationStart } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  appRootDiv: string = 'shell';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        switch(event.url) {
          case '/signin':
            this.router.navigate([`/auth${event.url}`]);
            break;
          case '/signup':
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

  onSigninClick() {
    var signinBtn = document.getElementById('nav-signin');
    if(signinBtn) {
      signinBtn.classList.remove('active');
    }
  }
}
