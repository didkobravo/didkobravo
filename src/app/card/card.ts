import { Component, HostBinding, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card {
  @HostBinding('class') class = 'card-animation-layer';
  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;
}
