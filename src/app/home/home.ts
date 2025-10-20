import { Component } from '@angular/core';

import { Hero } from '../hero/hero';
import { Cards } from '../cards/cards';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, Cards],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
