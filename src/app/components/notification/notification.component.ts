import { CommonModule } from '@angular/common';
import { Component, input, OnInit, output } from '@angular/core';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notification slide-in" [ngClass]="getNotificationClass()">
      <button class="delete" (click)="close()"></button>

      <div class="media">
        <div class="media-left">
          <span class="icon is-large">
            <i [class]="getIconClass()"></i>
          </span>
        </div>
        <div class="media-content">
          <p class="title is-5">{{ title() }}</p>
          <p class="subtitle is-6">{{ message() }}</p>
          <small class="has-text-grey">{{ createdAt }}</small>
        </div>
      </div>

      <!-- Auto-dismiss progress bar -->
      <div class="progress is-small mt-3" *ngIf="autoDismiss()">
        <div
          class="progress-value"
          [style.width.%]="progressWidth"
          [ngClass]="'has-background-' + type()"
        ></div>
      </div>
    </div>
  `,
  styles: [
    `
      .notification {
        margin-bottom: 1rem;
        position: relative;
        overflow: hidden;
      }

      .progress {
        height: 4px;
        border-radius: 2px;
        background-color: rgba(255, 255, 255, 0.3);
      }

      .progress-value {
        height: 100%;
        transition: width 0.1s linear;
        border-radius: 2px;
      }

      .media-left .icon {
        font-size: 2rem;
      }
    `,
  ],
})
export class NotificationComponent implements OnInit {
  // Input properties
  title = input.required<string>();
  message = input.required<string>();
  type = input<'primary' | 'info' | 'success' | 'warning' | 'danger'>('info');
  autoDismiss = input<boolean>(true);
  duration = input<number>(5000); // 5 seconds default

  // Output events
  closed = output<void>();

  // Component state
  createdAt = new Date().toLocaleTimeString();
  progressWidth = 100;
  private dismissTimer?: number;

  ngOnInit() {
    if (this.autoDismiss()) {
      this.startAutoDismiss();
    }
  }

  private startAutoDismiss() {
    const duration = this.duration();
    const updateInterval = 100; // Update every 100ms
    const decrement = (100 / duration) * updateInterval;

    this.dismissTimer = window.setInterval(() => {
      this.progressWidth -= decrement;

      if (this.progressWidth <= 0) {
        this.close();
      }
    }, updateInterval);
  }

  close() {
    if (this.dismissTimer) {
      clearInterval(this.dismissTimer);
    }
    this.closed.emit();
  }

  getNotificationClass(): string {
    return `is-${this.type()}`;
  }

  getIconClass(): string {
    const iconMap = {
      primary: 'fas fa-star',
      info: 'fas fa-info-circle',
      success: 'fas fa-check-circle',
      warning: 'fas fa-exclamation-triangle',
      danger: 'fas fa-times-circle',
    };
    return iconMap[this.type()] || iconMap.info;
  }
}
