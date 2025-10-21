import { Component, HostBinding, ViewChild, ElementRef, Input } from '@angular/core';

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
  @Input() title!: string; // Using 'title' as an example for text/data
  @Input() img!: string;   // Image source path or identifier
}
