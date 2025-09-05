import { CommonModule } from '@angular/common';
import { Component, input, Input, model, output } from '@angular/core';

export interface WidgetData {
  id: string;
  title: string;
  description: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  collapsed: boolean;
}

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card slide-in" [class.is-collapsed]="collapsed()">
      <!-- Widget Header -->
      <header class="card-header" [ngClass]="getHeaderClass()">
        <div class="card-header-title">
          <span class="icon mr-2">
            <i [class]="getIconClass()"></i>
          </span>
          <span>{{ title() }}</span>
        </div>

        <div class="card-header-icon">
          <!-- Collapse Toggle Button -->
          <button
            class="button is-small is-ghost"
            (click)="toggleCollapsed()"
            [title]="collapsed() ? 'Expand widget' : 'Collapse widget'"
          >
            <span class="icon">
              <i
                [class]="
                  collapsed() ? 'fas fa-chevron-down' : 'fas fa-chevron-up'
                "
              ></i>
            </span>
          </button>

          <!-- Close Button -->
          <button
            class="button is-small is-ghost ml-2"
            (click)="close()"
            title="Close widget"
          >
            <span class="icon">
              <i class="fas fa-times"></i>
            </span>
          </button>
        </div>
      </header>

      <!-- Widget Content (collapsible) -->
      <div class="card-content" *ngIf="!collapsed()">
        <div class="content">
          <p>{{ description() }}</p>

          <!-- Widget Stats -->
          <div class="level is-mobile">
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">Created</p>
                <p class="title is-6">{{ createdAt }}</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">Type</p>
                <p class="title is-6">{{ type().toUpperCase() }}</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">Status</p>
                <p class="title is-6">
                  {{ collapsed() ? 'Collapsed' : 'Expanded' }}
                </p>
              </div>
            </div>
          </div>

          <!-- Interactive Elements -->
          <div class="field is-grouped">
            <div class="control">
              <button
                class="button is-small is-primary"
                (click)="performAction('like')"
              >
                <span class="icon">
                  <i class="fas fa-heart"></i>
                </span>
                <span>Like</span>
              </button>
            </div>
            <div class="control">
              <button
                class="button is-small is-info"
                (click)="performAction('share')"
              >
                <span class="icon">
                  <i class="fas fa-share"></i>
                </span>
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Widget Footer -->
      <footer class="card-footer" *ngIf="!collapsed()">
        <a class="card-footer-item" (click)="performAction('edit')">
          <span class="icon">
            <i class="fas fa-edit"></i>
          </span>
          <span>Edit</span>
        </a>
        <a class="card-footer-item" (click)="performAction('duplicate')">
          <span class="icon">
            <i class="fas fa-copy"></i>
          </span>
          <span>Duplicate</span>
        </a>
      </footer>
    </div>
  `,
  styles: [
    `
      .card {
        margin-bottom: 1rem;
        transition: all 0.3s ease;
      }

      .card.is-collapsed {
        opacity: 0.8;
      }

      .card-header {
        transition: all 0.3s ease;
      }

      .card-header.has-background-info {
        background: linear-gradient(45deg, #3273dc, #209cee);
        color: white;
      }

      .card-header.has-background-success {
        background: linear-gradient(45deg, #23d160, #00d1b2);
        color: white;
      }

      .card-header.has-background-warning {
        background: linear-gradient(45deg, #ffdd57, #ff9f43);
        color: #333;
      }

      .card-header.has-background-danger {
        background: linear-gradient(45deg, #ff3860, #ff4757);
        color: white;
      }

      .button.is-ghost {
        background: transparent;
        border: none;
        color: inherit;
      }

      .button.is-ghost:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      .level {
        margin: 1rem 0;
      }

      .card-footer-item {
        cursor: pointer;
        transition: background-color 0.3s ease;
      }

      .card-footer-item:hover {
        background-color: #f5f5f5;
      }
    `,
  ],
})
export class WidgetComponent {
  // Input properties using the new signal inputs
  title = input.required<string>();
  description = input.required<string>();
  type = input<'info' | 'success' | 'warning' | 'danger'>('info');

  // Two-way binding for collapsed state
  collapsed = model<boolean>(false);

  // Output events
  closed = output<void>();
  actionPerformed = output<{ action: string; widgetId: string }>();

  // Component state
  createdAt = new Date().toLocaleTimeString();

  // Widget ID for tracking
  @Input() widgetId = Math.random().toString(36).substr(2, 9);

  toggleCollapsed() {
    // Update the model - this will automatically sync with parent
    this.collapsed.set(!this.collapsed());
  }

  close() {
    // Emit close event
    this.closed.emit();
  }

  performAction(action: string) {
    // Emit action event with data
    this.actionPerformed.emit({ action, widgetId: this.widgetId });
  }

  getHeaderClass(): string {
    const baseClass = 'card-header';
    const typeClass = `has-background-${this.type()}`;
    return `${baseClass} ${typeClass}`;
  }

  getIconClass(): string {
    const iconMap = {
      info: 'fas fa-info-circle',
      success: 'fas fa-check-circle',
      warning: 'fas fa-exclamation-triangle',
      danger: 'fas fa-times-circle',
    };
    return iconMap[this.type()];
  }
}
