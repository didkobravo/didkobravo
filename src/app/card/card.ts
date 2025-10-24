import { Component, HostBinding, ViewChild, ElementRef, Input, signal, AfterViewInit } from '@angular/core';

export type AnimationDirection = 'left' | 'right' | 'default';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card implements AfterViewInit {
  @HostBinding('class') class = 'card-animation-layer';
  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;
  @Input() title!: string;
  @Input() img!: string;

  animationDirection = signal<AnimationDirection>('default');  
  private dialogReady = false;

  ngAfterViewInit(): void {
    this.dialogReady = true;
  }

  openDialog(): void {
    if (!this.dialogReady) {
      console.warn('Dialog not ready yet');
      return;
    }
    this.animationDirection.set('default');
    if (this.dialog?.nativeElement) {
      this.dialog.nativeElement.showModal();
    }
  }

  closeDialog(): void {
    if (!this.dialogReady) return;
    if (this.dialog?.nativeElement) {
      this.dialog.nativeElement.close();
    }
  }

  openDialogWithDirection(direction: 'left' | 'right'): void {
    if (!this.dialogReady) return;
    this.setDialogClass(direction);
    if (this.dialog?.nativeElement) {
      this.dialog.nativeElement.showModal();
    }
  }

  closeDialogWithDirection(direction: 'left' | 'right'): void {
    if (!this.dialogReady) return;
    // Keep the class so the close animation uses the right direction
    this.setDialogClass(direction);
    if (this.dialog?.nativeElement) {
      this.dialog.nativeElement.close();
    }
  }

  private setDialogClass(direction: AnimationDirection): void {
    if (!this.dialog?.nativeElement) return;
    
    const dialogEl = this.dialog.nativeElement;
    
    // Remove all direction classes
    dialogEl.classList.remove('left', 'right', 'default');
    
    // Add the appropriate one
    if (direction !== 'default') {
      dialogEl.classList.add(direction);
    }
  }

  /**
   * Handle card click to open dialog
   */
   onCardClick(): void {
    this.openDialog();
  }
}
