import { CommonModule } from '@angular/common';
import {
  Component,
  ComponentRef,
  ViewContainerRef,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

// Import our custom components and directives
import { NotificationComponent } from './components/notification/notification.component';
import { WidgetComponent } from './components/widget/widget.component';
import { HoverEffectDirective } from './directives/hover-effect.directive';
import { PulseAnimationDirective } from './directives/pulse-animation.directive';

// Import the new Angular 20 binding functions
import { inputBinding, outputBinding, twoWayBinding } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HoverEffectDirective,
    PulseAnimationDirective,
  ],
  template: `
    <!-- Hero Section -->
    <section class="hero gradient-bg">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1 has-text-white">
            <span class="icon mr-3">
              <i class="fas fa-magic"></i>
            </span>
            Angular 20 Dynamic Components
          </h1>
          <h2 class="subtitle is-3 has-text-white-ter">
            The Clean, Modern Way to Create Components Dynamically
          </h2>
          <p class="has-text-white-bis is-size-5">
            Experience the new binding APIs that make dynamic component creation
            as easy as template binding!
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="section">
      <div class="container">
        <!-- Stats Row -->
        <div class="columns is-marginless mb-6">
          <div class="column">
            <div class="stats-card">
              <p class="title is-4 has-text-white">{{ componentsCreated() }}</p>
              <p class="subtitle is-6 has-text-white">Components Created</p>
            </div>
          </div>
          <div class="column">
            <div class="stats-card">
              <p class="title is-4 has-text-white">
                {{ notificationsShown() }}
              </p>
              <p class="subtitle is-6 has-text-white">Notifications Shown</p>
            </div>
          </div>
          <div class="column">
            <div class="stats-card">
              <p class="title is-4 has-text-white">{{ actionsPerformed() }}</p>
              <p class="subtitle is-6 has-text-white">Actions Performed</p>
            </div>
          </div>
        </div>

        <!-- Control Panel -->
        <div class="control-panel">
          <h3 class="title is-4">
            <span class="icon mr-2">
              <i class="fas fa-sliders-h"></i>
            </span>
            Control Panel
          </h3>

          <div class="columns">
            <!-- Widget Controls -->
            <div class="column">
              <h4 class="subtitle is-5">Widget Components</h4>

              <div class="field">
                <label class="label">Widget Title</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    [(ngModel)]="widgetTitle"
                    placeholder="Enter widget title"
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Widget Type</label>
                <div class="control">
                  <div class="select is-fullwidth">
                    <select [(ngModel)]="widgetType">
                      <option value="info">Info</option>
                      <option value="success">Success</option>
                      <option value="warning">Warning</option>
                      <option value="danger">Danger</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <label class="checkbox">
                    <input type="checkbox" [(ngModel)]="globalCollapsed" />
                    Start widgets collapsed
                  </label>
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <label class="checkbox">
                    <input type="checkbox" [(ngModel)]="enableHoverEffect" />
                    Enable hover effects
                  </label>
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <label class="checkbox">
                    <input type="checkbox" [(ngModel)]="enablePulseAnimation" />
                    Enable pulse animation
                  </label>
                </div>
              </div>

              <div class="field is-grouped">
                <div class="control">
                  <button
                    class="button is-primary demo-button"
                    (click)="createWidget()"
                    [disabled]="!widgetTitle.trim()"
                  >
                    <span class="icon">
                      <i class="fas fa-plus"></i>
                    </span>
                    <span>Create Widget</span>
                  </button>
                </div>
                <div class="control">
                  <button
                    class="button is-info demo-button"
                    (click)="createMultipleWidgets()"
                  >
                    <span class="icon">
                      <i class="fas fa-layer-group"></i>
                    </span>
                    <span>Create 3 Widgets</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Notification Controls -->
            <div class="column">
              <h4 class="subtitle is-5">Notification Components</h4>

              <div class="field">
                <label class="label">Notification Title</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    [(ngModel)]="notificationTitle"
                    placeholder="Enter notification title"
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Notification Type</label>
                <div class="control">
                  <div class="select is-fullwidth">
                    <select [(ngModel)]="notificationType">
                      <option value="primary">Primary</option>
                      <option value="info">Info</option>
                      <option value="success">Success</option>
                      <option value="warning">Warning</option>
                      <option value="danger">Danger</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="field">
                <label class="label">Auto Dismiss Duration (ms)</label>
                <div class="control">
                  <input
                    class="input"
                    type="number"
                    [(ngModel)]="notificationDuration"
                    min="1000"
                    max="10000"
                    step="500"
                  />
                </div>
              </div>

              <div class="field is-grouped">
                <div class="control">
                  <button
                    class="button is-success demo-button"
                    (click)="createNotification()"
                    [disabled]="!notificationTitle.trim()"
                  >
                    <span class="icon">
                      <i class="fas fa-bell"></i>
                    </span>
                    <span>Show Notification</span>
                  </button>
                </div>
                <div class="control">
                  <button
                    class="button is-warning demo-button"
                    (click)="clearAllComponents()"
                  >
                    <span class="icon">
                      <i class="fas fa-trash"></i>
                    </span>
                    <span>Clear All</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Dynamic Components Container -->
        <div class="columns">
          <!-- Widgets Column -->
          <div class="column">
            <h3 class="title is-4">
              <span class="icon mr-2">
                <i class="fas fa-th-large"></i>
              </span>
              Dynamic Widgets ({{ activeWidgets().length }})
            </h3>
            <div class="dynamic-container">
              <!-- Empty state - only show when NO widgets exist -->
              @if (activeWidgets().length === 0) {
              <div class="empty-state">
                <span class="icon is-large">
                  <i class="fas fa-cube fa-3x"></i>
                </span>
                <p class="mt-4">
                  No widgets created yet. Use the controls above to create some!
                </p>
              </div>
              }
              <!-- ViewContainer for dynamic widgets - THIS IS THE KEY! -->
              <ng-container #widgetContainer></ng-container>
            </div>
          </div>

          <!-- Notifications Column -->
          <div class="column">
            <h3 class="title is-4">
              <span class="icon mr-2">
                <i class="fas fa-bell"></i>
              </span>
              Dynamic Notifications ({{ activeNotifications().length }})
            </h3>
            <div class="dynamic-container">
              <!-- Empty state - only show when NO notifications exist -->
              @if (activeNotifications().length === 0) {
              <div class="empty-state">
                <span class="icon is-large">
                  <i class="fas fa-bell-slash fa-3x"></i>
                </span>
                <p class="mt-4">
                  No notifications to show. Create some using the controls
                  above!
                </p>
              </div>
              }
              <!-- ViewContainer for dynamic notifications - THIS IS THE KEY! -->
              <ng-container #notificationContainer></ng-container>
            </div>
          </div>
        </div>

        <!-- Code Examples Section -->
        <div class="box mt-6">
          <h3 class="title is-4">
            <span class="icon mr-2">
              <i class="fas fa-code"></i>
            </span>
            Live Code Example
          </h3>
          <p class="subtitle is-6">
            This is how the last widget was created using Angular 20's new
            binding APIs:
          </p>

          <pre
            class="has-background-dark has-text-light p-4"
            style="border-radius: 8px; overflow-x: auto;"
          ><code>{{ lastCodeExample }}</code></pre>
        </div>

        <!-- Feature Highlights -->
        <div class="columns mt-6">
          <div class="column">
            <div class="card">
              <div class="card-content">
                <h4 class="title is-5">
                  <span class="icon mr-2 has-text-primary">
                    <i class="fas fa-link"></i>
                  </span>
                  Input Binding
                </h4>
                <p>
                  Clean, declarative input binding with automatic signal
                  tracking and reactivity.
                </p>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="card">
              <div class="card-content">
                <h4 class="title is-5">
                  <span class="icon mr-2 has-text-info">
                    <i class="fas fa-exchange-alt"></i>
                  </span>
                  Two-Way Binding
                </h4>
                <p>
                  Effortless two-way data binding without manual subscription
                  management.
                </p>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="card">
              <div class="card-content">
                <h4 class="title is-5">
                  <span class="icon mr-2 has-text-success">
                    <i class="fas fa-broadcast-tower"></i>
                  </span>
                  Output Binding
                </h4>
                <p>
                  Simple output handling with proper TypeScript support and
                  automatic cleanup.
                </p>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="card">
              <div class="card-content">
                <h4 class="title is-5">
                  <span class="icon mr-2 has-text-warning">
                    <i class="fas fa-magic"></i>
                  </span>
                  Runtime Directives
                </h4>
                <p>
                  Apply directives to dynamic components at runtime with full
                  configuration support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer has-background-dark has-text-white">
      <div class="content has-text-centered">
        <p>
          <strong class="has-text-white"
            >Angular 20 Dynamic Components Demo</strong
          >
          <br />
          Showcasing the new binding APIs that make dynamic components clean and
          maintainable.
        </p>
        <p>
          <span class="icon">
            <i class="fab fa-github"></i>
          </span>
          <a
            href="https://github.com/rogeriolaa/angular-dynamic-components-bindings"
            class="has-text-light"
          >
            View on GitHub
          </a>
        </p>
      </div>
    </footer>
  `,
  styles: [
    `
      .hero {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }

      .dynamic-container {
        min-height: 300px;
        max-height: 600px;
        overflow-y: auto;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        position: relative; /* Important for absolute positioning */
      }

      /* Empty state styling */
      .empty-state {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: #888888;
        font-size: 1.1rem;
        user-select: none;
        pointer-events: none;
        width: 80%; /* Prevent text from hitting edges */
      }

      .control-panel {
        background: white;
        border-radius: 12px;
        padding: 2rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        margin-bottom: 2rem;
      }

      .stats-card {
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        border-radius: 12px;
        padding: 1.5rem;
        text-align: center;
        box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
      }

      .demo-button {
        transition: all 0.3s ease;
      }

      .demo-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      }

      pre {
        font-size: 0.9rem;
        line-height: 1.4;
      }

      .card {
        height: 100%;
        transition: transform 0.3s ease;
      }

      .card:hover {
        transform: translateY(-5px);
      }
    `,
  ],
})
export class AppComponent {
  // ViewContainer references for dynamic component creation
  private widgetContainer = viewChild.required('widgetContainer', {
    read: ViewContainerRef,
  });
  private notificationContainer = viewChild.required('notificationContainer', {
    read: ViewContainerRef,
  });

  // Component state using signals
  componentsCreated = signal(0);
  notificationsShown = signal(0);
  actionsPerformed = signal(0);
  activeWidgets = signal<ComponentRef<WidgetComponent>[]>([]);
  activeNotifications = signal<ComponentRef<NotificationComponent>[]>([]);

  // Form controls
  widgetTitle = 'Sample Widget';
  widgetType: 'info' | 'success' | 'warning' | 'danger' = 'info';
  globalCollapsed = signal(false);
  enableHoverEffect = true;
  enablePulseAnimation = false;

  notificationTitle = 'Hello World!';
  notificationType: 'primary' | 'info' | 'success' | 'warning' | 'danger' =
    'info';
  notificationDuration = 5000;

  // Code example display
  lastCodeExample = '';

  constructor() {
    // Set up initial code example
    this.updateCodeExample('widget');
  }

  /**
   * Creates a dynamic widget using Angular 20's new binding APIs
   * This is the magic! ✨
   */
  createWidget() {
    const container = this.widgetContainer();

    // Generate unique description
    const widgetCount = this.componentsCreated() + 1;
    const description = `This is widget #${widgetCount} created dynamically using Angular 20's new binding APIs. Notice how clean and declarative this code is!`;

    // 🎉 THE NEW ANGULAR 20 WAY 🎉
    // Look how clean and beautiful this is compared to the old way!
    const componentRef = container.createComponent(WidgetComponent, {
      bindings: [
        // Input bindings - clean and declarative
        inputBinding('title', () => this.widgetTitle),
        inputBinding('description', () => description),
        inputBinding('type', () => this.widgetType),

        // Two-way binding - replaces all the manual subscription hell!
        twoWayBinding('collapsed', this.globalCollapsed),

        // Output bindings - simple event handling
        outputBinding('closed', () => {
          this.removeWidget(componentRef);
        }),
        outputBinding<{ action: string; widgetId: string }>(
          'actionPerformed',
          (data) => {
            this.handleWidgetAction(data);
          }
        ),
      ],

      // 🚀 BONUS: Runtime directives!
      // Apply directives dynamically - this was impossible before!
      directives: [
        // Simple directive (if enabled)
        ...(this.enableHoverEffect ? [HoverEffectDirective] : []),

        // Complex directive with configuration (if enabled)
        ...(this.enablePulseAnimation
          ? [
              {
                type: PulseAnimationDirective,
                bindings: [], // No inputs needed for this directive
              },
            ]
          : []),
      ],
    });

    // Update component tracking
    this.activeWidgets.update((widgets) => [...widgets, componentRef]);
    this.componentsCreated.update((count) => count + 1);

    // Update code example
    this.updateCodeExample('widget');

    // Reset form
    this.widgetTitle = `Widget ${this.componentsCreated() + 1}`;
  }

  /**
   * Creates a dynamic notification using the new binding APIs
   */
  createNotification() {
    const container = this.notificationContainer();

    // Generate message
    const notificationCount = this.notificationsShown() + 1;
    const message = `This is notification #${notificationCount}. It will auto-dismiss in ${
      this.notificationDuration / 1000
    } seconds unless you close it manually.`;

    // 🎉 THE NEW ANGULAR 20 WAY FOR NOTIFICATIONS 🎉
    const componentRef = container.createComponent(NotificationComponent, {
      bindings: [
        // Input bindings with dynamic values
        inputBinding('title', () => this.notificationTitle),
        inputBinding('message', () => message),
        inputBinding('type', () => this.notificationType),
        inputBinding('autoDismiss', () => true),
        inputBinding('duration', () => this.notificationDuration),

        // Output binding for close event
        outputBinding('closed', () => {
          this.removeNotification(componentRef);
        }),
      ],
    });

    // Update tracking
    this.activeNotifications.update((notifications) => [
      ...notifications,
      componentRef,
    ]);
    this.notificationsShown.update((count) => count + 1);

    // Update code example
    this.updateCodeExample('notification');

    // Reset form
    this.notificationTitle = `Notification ${this.notificationsShown() + 1}`;
  }

  /**
   * Creates multiple widgets at once to show the power of the new APIs
   */
  createMultipleWidgets() {
    const types: ('info' | 'success' | 'warning' | 'danger')[] = [
      'info',
      'success',
      'warning',
    ];

    types.forEach((type, index) => {
      // Temporarily override settings for demo
      const originalTitle = this.widgetTitle;
      const originalType = this.widgetType;

      this.widgetTitle = `Batch Widget ${index + 1}`;
      this.widgetType = type;

      // Small delay for visual effect
      setTimeout(() => {
        this.createWidget();
      }, index * 200);

      // Restore original settings
      this.widgetTitle = originalTitle;
      this.widgetType = originalType;
    });
  }

  /**
   * Removes a widget from the container and updates tracking
   */
  private removeWidget(componentRef: ComponentRef<WidgetComponent>) {
    // Remove from tracking
    this.activeWidgets.update((widgets) =>
      widgets.filter((widget) => widget !== componentRef)
    );

    // Destroy the component (Angular handles cleanup automatically!)
    componentRef.destroy();
  }

  /**
   * Removes a notification from the container and updates tracking
   */
  private removeNotification(
    componentRef: ComponentRef<NotificationComponent>
  ) {
    // Remove from tracking
    this.activeNotifications.update((notifications) =>
      notifications.filter((notification) => notification !== componentRef)
    );

    // Destroy the component
    componentRef.destroy();
  }

  /**
   * Handles widget actions and updates stats
   */
  private handleWidgetAction(data: { action: string; widgetId: string }) {
    console.log('Widget action performed:', data);
    this.actionsPerformed.update((count) => count + 1);

    // Show a quick notification about the action
    const originalTitle = this.notificationTitle;
    const originalType = this.notificationType;

    this.notificationTitle = `Action: ${data.action}`;
    this.notificationType = 'success';
    this.createNotification();

    // Restore original values
    this.notificationTitle = originalTitle;
    this.notificationType = originalType;
  }

  /**
   * Clears all dynamic components
   */
  clearAllComponents() {
    // Clear widgets
    this.activeWidgets().forEach((widget) => widget.destroy());
    this.activeWidgets.set([]);

    // Clear notifications
    this.activeNotifications().forEach((notification) =>
      notification.destroy()
    );
    this.activeNotifications.set([]);

    // Clear containers
    this.widgetContainer().clear();
    this.notificationContainer().clear();
  }

  /**
   * Updates the code example display
   */
  private updateCodeExample(type: 'widget' | 'notification') {
    if (type === 'widget') {
      this.lastCodeExample = `// Creating a widget with Angular 20's new binding APIs
const componentRef = container.createComponent(WidgetComponent, {
  bindings: [
    // Input bindings - clean and declarative
    inputBinding('title', () => '${this.widgetTitle}'),
    inputBinding('type', () => '${this.widgetType}'),
    
    // Two-way binding - no manual subscriptions needed!
    twoWayBinding('collapsed', this.globalCollapsed),
    
    // Output binding - simple event handling
    outputBinding('closed', () => {
      this.removeWidget(componentRef);
    })
  ],
  
  // Runtime directives - apply directives dynamically!
  directives: [${this.enableHoverEffect ? 'HoverEffectDirective' : ''}${
        this.enablePulseAnimation ? ', PulseAnimationDirective' : ''
      }]
});`;
    } else {
      this.lastCodeExample = `// Creating a notification with Angular 20's new binding APIs
const componentRef = container.createComponent(NotificationComponent, {
  bindings: [
    inputBinding('title', () => '${this.notificationTitle}'),
    inputBinding('type', () => '${this.notificationType}'),
    inputBinding('duration', () => ${this.notificationDuration}),
    
    outputBinding('closed', () => {
      this.removeNotification(componentRef);
    })
  ]
});`;
    }
  }
}
