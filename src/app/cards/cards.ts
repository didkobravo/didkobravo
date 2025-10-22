import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../card/card';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, Card],
  templateUrl: './cards.html',
  styleUrl: './cards.scss'
})
export class Cards {
}
