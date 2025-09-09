import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  ngOnInit() {
    var navActions = document.getElementsByClassName('nav-action');
    for (let i = 0; i < navActions.length; i++) {
      let element = navActions[i] as HTMLElement;
      element.classList.remove('active');
    }
    var signoutBtn = document.getElementById('nav-signout') as HTMLElement;
    if (signoutBtn) {
      signoutBtn.classList.add('active');
    }
  }
}
