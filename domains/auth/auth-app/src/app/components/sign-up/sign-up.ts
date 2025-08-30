import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-sign-up',
  imports: [CommonModule, RouterLink],
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.scss']
})
export class SignUp {

}
