import { Component, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
// Note: SplitText is a plugin, so it needs to be registered with GSAP
// The exact import path might vary slightly depending on your GSAP installation,
// but the following is typical for Angular/npm setups:
import { SplitText } from 'gsap/SplitText';

// Register the plugin globally with GSAP
gsap.registerPlugin(SplitText);

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero implements AfterViewInit {
  
  ngAfterViewInit(): void {

    // === H1 Animation ===
    // 1. Create the SplitText instance for the h1 element
    const h1Split = new SplitText(".hero h1", {
      type: "words, chars",
      onSplit(self) {
        gsap.from(self.chars, {
          y: 50,
          autoAlpha: 0,
          duration: 0.7,
          ease: "power4",
          // rotation: '360deg',
          scale: 0,
          stagger: {
            // grid: [5,10], 
            amount: 1.2,
            from: 'start',
            // opacity: 0
          }
        });
      }
    });

    // === p Animation ===
    // 2. Create the SplitText instance for the p element
    const pSplit = new SplitText(".hero p", {
      type: "words, chars",
      onSplit(self) {
        gsap.from(self.words, {
          x: -50,
          autoAlpha: 0,
          duration: 0.4,
          delay: 1.5,
          ease: "power4",
          stagger: {
            // grid: [5,10], 
            amount: 1.2,
            from: 'start'
          }
        });
      }
    });
    
  }

}
