import { Component } from '@angular/core';

import { Card } from '../card/card';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [Card],
  templateUrl: './cards.html',
  styleUrl: './cards.scss'
})
export class Cards {

}
