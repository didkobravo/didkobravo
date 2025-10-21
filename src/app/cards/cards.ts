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
  cards: any[] = [
    {
      title: 'Card 1',
      img: 'https://assets.codepen.io/2585/Roboto.svg',
      cardContent: 'Sort of short and tiny amount of content here.',
      dialogContent: 'In the dialog: I specialize in dark-themed, cinematic photography focusing on urban landscapes...',
    },
    {
      title: 'Card 1',
      img: 'https://assets.codepen.io/2585/Roboto.svg',
      cardContent: 'Sort of short and tiny amount of content here.',
      dialogContent: 'In the dialog: I specialize in dark-themed, cinematic photography focusing on urban landscapes...',
    },
    {
      title: 'Card 1',
      img: 'https://assets.codepen.io/2585/Roboto.svg',
      cardContent: 'Sort of short and tiny amount of content here.',
      dialogContent: 'In the dialog: I specialize in dark-themed, cinematic photography focusing on urban landscapes...',
    },
    {
      title: 'Card 1',
      img: 'https://assets.codepen.io/2585/Roboto.svg',
      cardContent: 'Sort of short and tiny amount of content here.',
      dialogContent: 'In the dialog: I specialize in dark-themed, cinematic photography focusing on urban landscapes...',
    },
    {
      title: 'Card 1',
      img: 'https://assets.codepen.io/2585/Roboto.svg',
      cardContent: 'Sort of short and tiny amount of content here.',
      dialogContent: 'In the dialog: I specialize in dark-themed, cinematic photography focusing on urban landscapes...',
    },
    {
      title: 'Card 1',
      img: 'https://assets.codepen.io/2585/Roboto.svg',
      cardContent: 'Sort of short and tiny amount of content here.',
      dialogContent: 'In the dialog: I specialize in dark-themed, cinematic photography focusing on urban landscapes...',
    },
    {
      title: 'Card 1',
      img: 'https://assets.codepen.io/2585/Roboto.svg',
      cardContent: 'Sort of short and tiny amount of content here.',
      dialogContent: 'In the dialog: I specialize in dark-themed, cinematic photography focusing on urban landscapes...',
    },
    {
      title: 'Card 1',
      img: 'https://assets.codepen.io/2585/Roboto.svg',
      cardContent: 'Sort of short and tiny amount of content here.',
      dialogContent: 'In the dialog: I specialize in dark-themed, cinematic photography focusing on urban landscapes...',
    },
    {
      title: 'Card 1',
      img: 'https://assets.codepen.io/2585/Roboto.svg',
      cardContent: 'Sort of short and tiny amount of content here.',
      dialogContent: 'In the dialog: I specialize in dark-themed, cinematic photography focusing on urban landscapes...',
    },
  ]
}
