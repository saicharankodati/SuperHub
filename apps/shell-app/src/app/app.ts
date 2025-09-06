import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router, Event, NavigationStart } from '@angular/router';
import { IndexedDBService } from './services/indexeddb.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {

  constructor(
    private router: Router,
    private indexedDBService: IndexedDBService
  ) {}

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
      this.checkActiveUserContext();
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

  checkActiveUserContext() {
    var userContext = {
      id: 1,
      username: 'Sai Charan Kodati',
      email: 'saicharan.kodati@example.com'
    };
    this.indexedDBService.set('userContext', userContext).then((data) => {
      debugger;
    });
    
    this.indexedDBService.get('userContext', 1).then((data) => {
      debugger;
    });

    // await this.indexedDbService.set('formDrafts', { formId: 'project-123', data: { name: 'New Project' } });
    // const draft = await this.indexedDbService.get('formDrafts', 'project-123');
    // await this.indexedDbService.delete('formDrafts', 'project-123');
    // await this.indexedDbService.clear('formDrafts');
  }

  onSigninClick() {
    var signinBtn = document.getElementById('nav-signin');
    if(signinBtn) {
      signinBtn.classList.remove('active');
    }
  }
}
