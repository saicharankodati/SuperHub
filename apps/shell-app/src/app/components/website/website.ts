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
    var navActions = document.querySelectorAll('.nav-action');
    for (let i = 0; i < navActions.length; i++) {
      let element = navActions[i] as HTMLElement;
      element.classList.remove('active');
    }
    setTimeout(() => {
      var getStartedBtn = document.querySelector('#nav-get-started') as HTMLElement;
      if (getStartedBtn) {
        getStartedBtn.classList.add('active');
      }
    }, 300);
  }
}
