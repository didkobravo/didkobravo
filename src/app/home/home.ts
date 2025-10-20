import { Component } from '@angular/core';

import { Hero } from '../hero/hero';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
