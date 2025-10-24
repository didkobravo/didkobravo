import { Component, OnInit, ViewChildren, QueryList, signal, effect, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../card/card';
import { NavigationService, NavigationEvent } from '../navigation';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, Card],
  templateUrl: './cards.html',
  styleUrl: './cards.scss'
})
export class Cards implements OnInit, AfterViewInit {
  @ViewChildren(Card) cardComponents!: QueryList<Card>;
  
  private navigationService = inject(NavigationService);
  
  currentIndex = signal(0);
  lastDirection = signal<'left' | 'right'>('right');
  private isTransitioning = false;

  constructor() {
    // This effect will handle opening/closing dialogs based on navigation
    effect(() => {
      const index = this.currentIndex();
      // This will trigger whenever currentIndex changes
      // The actual dialog opening happens in ngAfterViewInit
    });
  }

  ngOnInit(): void {
    this.navigationService.setTotalCards(7); 
  }

  ngAfterViewInit(): void {
    this.navigationService.navigation$.subscribe((event: NavigationEvent) => {
      // Block navigation if a transition is already happening
      if (this.isTransitioning) {
        console.log('Transition in progress, ignoring navigation');
        return;
      }

      this.lastDirection.set(event.direction);
      
      if (event.isOpen) {
        this.isTransitioning = true; // Lock transitions
        this.transitionToCard(this.currentIndex(), event.targetIndex, event.direction);
      } else {
        this.openCard(event.targetIndex);
      }
    });
  }

  openCard(index: number): void {
    if (index >= 0 && index < this.cardComponents.length) {
      const cardComponent = this.cardComponents.toArray()[index];
      cardComponent.openDialog();
      this.currentIndex.set(index);
    }
  }

  closeCurrentDialog(): void {
    if (this.currentIndex() >= 0 && this.currentIndex() < this.cardComponents.length) {
      const cardComponent = this.cardComponents.toArray()[this.currentIndex()];
      cardComponent.closeDialog();
      this.navigationService.closeDialog();
    }
  }

  private transitionToCard(currentIndex: number, targetIndex: number, direction: 'left' | 'right'): void {
    if (currentIndex >= 0 && currentIndex < this.cardComponents.length &&
        targetIndex >= 0 && targetIndex < this.cardComponents.length) {
      
      const currentCard = this.cardComponents.toArray()[currentIndex];
      currentCard.closeDialogWithDirection(direction);

      setTimeout(() => {
        const nextCard = this.cardComponents.toArray()[targetIndex];
        nextCard.openDialogWithDirection(direction);
        this.currentIndex.set(targetIndex);
        this.isTransitioning = false; // Unlock after transition completes
      }, 500);
    }
  }
}
