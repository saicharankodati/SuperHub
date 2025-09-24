import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit {
  ngOnInit() {
    var navActions = document.querySelectorAll('.nav-action');
    for (let i = 0; i < navActions.length; i++) {
      let element = navActions[i] as HTMLElement;
      element.classList.remove('active');
    }
    setTimeout(() => {
      var signoutBtn = document.querySelector('#nav-signout') as HTMLElement;
      if (signoutBtn) {
        signoutBtn.classList.add('active');
      }
    }, 300);
  }
}
