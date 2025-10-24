import { Injectable, signal, effect } from '@angular/core';
import { Subject } from 'rxjs';

export type NavigationDirection = 'left' | 'right';

export interface NavigationEvent {
  direction: NavigationDirection;
  targetIndex: number;
  isOpen: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private currentIndex = signal(0);
  private totalCards = signal(0);
  private isDialogOpen = signal(false);
  private touchStartX = 0;
  private touchEndX = 0;
  private swipeThreshold = 50; // pixels

  // Public observables
  navigation$ = new Subject<NavigationEvent>();
  
  constructor() {
    this.setupKeyboardListener();
    this.setupTouchListener();
  }

  /**
   * Initialize the service with total number of cards
   */
  setTotalCards(count: number): void {
    this.totalCards.set(count);
  }

  /**
   * Set dialog open/closed state
   */
  setDialogOpen(isOpen: boolean, index?: number): void {
    this.isDialogOpen.set(isOpen);
    if (isOpen && index !== undefined) {
      this.currentIndex.set(index);
    }
  }

  /**
   * Get current index
   */
  getCurrentIndex(): number {
    return this.currentIndex();
  }

  /**
   * Navigate to next card
   */
  goNext(): void {
    const nextIndex = (this.currentIndex() + 1) % this.totalCards();
    this.navigate(nextIndex, 'right');
  }

  /**
   * Navigate to previous card
   */
  goPrevious(): void {
    const prevIndex = this.currentIndex() === 0 ? this.totalCards() - 1 : this.currentIndex() - 1;
    this.navigate(prevIndex, 'left');
  }

  /**
   * Navigate to specific card
   */
  navigateTo(index: number): void {
    if (index >= 0 && index < this.totalCards()) {
      const direction = index > this.currentIndex() ? 'right' : 'left';
      this.navigate(index, direction);
    }
  }

  /**
   * Private method to emit navigation event
   */
  private navigate(targetIndex: number, direction: NavigationDirection): void {
    const wasOpen = this.isDialogOpen();
    console.log('NavigationService.navigate:', {
      fromIndex: this.currentIndex(),
      toIndex: targetIndex,
      wasOpen,
      direction
    });

    this.currentIndex.set(targetIndex);
    
    // If dialog wasn't open, open it
    if (!wasOpen) {
      this.isDialogOpen.set(true);
    }

    this.navigation$.next({
      direction,
      targetIndex,
      isOpen: wasOpen // true if already was open (transition), false if opening for first time
    });
  }

  /**
   * Keyboard navigation setup
   */
  private setupKeyboardListener(): void {
    let lastKeyTime = 0;
    const debounceMs = 100; // Prevent double-fires within 100ms
    
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      const now = Date.now();
      
      // Only process if enough time has passed since last key
      if (now - lastKeyTime < debounceMs) {
        return;
      }
      
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        lastKeyTime = now;
        this.goNext();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        lastKeyTime = now;
        this.goPrevious();
      }
    });
  }

  /**
   * Touch/Swipe navigation setup
   * Only listens when dialog is open
   */
  private setupTouchListener(): void {
    document.addEventListener('touchstart', (e: TouchEvent) => {
      if (this.isDialogOpen() && e.touches.length === 1) {
        this.touchStartX = e.touches[0].clientX;
      }
    }, false);

    document.addEventListener('touchend', (e: TouchEvent) => {
      if (this.isDialogOpen() && e.changedTouches.length === 1) {
        this.touchEndX = e.changedTouches[0].clientX;
        this.handleSwipe();
      }
    }, false);
  }

  /**
   * Handle swipe logic
   */
  private handleSwipe(): void {
    const diff = this.touchStartX - this.touchEndX;

    // Swiped left, show next card
    if (diff > this.swipeThreshold) {
      this.goNext();
    }
    // Swiped right, show previous card
    else if (diff < -this.swipeThreshold) {
      this.goPrevious();
    }
  }

  /**
   * Close dialog and reset
   */
  closeDialog(): void {
    this.isDialogOpen.set(false);
  }
}