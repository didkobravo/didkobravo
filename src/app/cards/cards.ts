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

  ngOnInit(): void {
    // Tell the service how many cards we have
    this.navigationService.setTotalCards(7); 
  }

  ngAfterViewInit(): void {
    // NOW the child card components are initialized
    // Subscribe to navigation events HERE, not in ngOnInit
    this.navigationService.navigation$.subscribe((event: NavigationEvent) => {
      this.lastDirection.set(event.direction);
      
      if (event.isOpen) {
        // Dialog was already open - transition between cards
        this.transitionToCard(this.currentIndex(), event.targetIndex, event.direction);
      } else {
        // Dialog wasn't open - open it for the first time
        console.log('Opening card', event.targetIndex);
        this.openCard(event.targetIndex);
      }
    });
  }

  /**
   * Open a specific card's dialog
   */
  openCard(index: number): void {
    console.log('openCard called with index:', index, 'total cards:', this.cardComponents.length);
    if (index >= 0 && index < this.cardComponents.length) {
      const cardComponent = this.cardComponents.toArray()[index];
      console.log('Opening dialog for card', index);
      cardComponent.openDialog();
      this.navigationService.setDialogOpen(true, index);
      this.currentIndex.set(index);
    }
  }

  /**
   * Close current dialog
   */
  closeCurrentDialog(): void {
    if (this.currentIndex() >= 0 && this.currentIndex() < this.cardComponents.length) {
      const cardComponent = this.cardComponents.toArray()[this.currentIndex()];
      cardComponent.closeDialog();
      this.navigationService.closeDialog();
    }
  }

  /**
   * Transition from current card to next/previous with direction
   */
  private transitionToCard(currentIndex: number, targetIndex: number, direction: 'left' | 'right'): void {
    console.log('cards -> transitionToCard(direction: '+ direction+')');
    if (currentIndex >= 0 && currentIndex < this.cardComponents.length &&
        targetIndex >= 0 && targetIndex < this.cardComponents.length) {
      
      const currentCard = this.cardComponents.toArray()[currentIndex];
      console.log('cards -> transitionToCard -> closeDialogWithDirection');
      currentCard.closeDialogWithDirection(direction);

      setTimeout(() => {
        const nextCard = this.cardComponents.toArray()[targetIndex];
        nextCard.openDialogWithDirection(direction);
        this.currentIndex.set(targetIndex);
      }, 500);
    }
  }
}