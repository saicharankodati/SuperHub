import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-website',
  imports: [],
  templateUrl: './website.html',
  styleUrls: ['./website.scss']
})
export class Website implements OnInit {
  ngOnInit() {
    var navActions = document.getElementsByClassName('nav-action');
    for (let i = 0; i < navActions.length; i++) {
      let element = navActions[i] as HTMLElement;
      element.classList.remove('active');
    }
    var getStartedBtn = document.getElementById('nav-get-started') as HTMLElement;
    if (getStartedBtn) {
      getStartedBtn.classList.add('active');
    }
  }
}
