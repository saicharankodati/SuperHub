import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-sign-in',
  imports: [CommonModule, RouterLink],
  templateUrl: './sign-in.html',
  styleUrls: ['./sign-in.scss']
})
export class SignIn {

}
