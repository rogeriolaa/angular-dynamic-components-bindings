# Angular 20 Dynamic Components Demo 🚀

<div align="center">

![Angular](https://img.shields.io/badge/Angular-20.0.0-red?style=for-the-badge&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=for-the-badge&logo=typescript)
![Bulma](https://img.shields.io/badge/Bulma-0.9.4-00D1B2?style=for-the-badge&logo=bulma)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Experience the future of Angular dynamic components with clean, declarative APIs**

[🔥 Live Demo](https://rogeriolaa.github.io/angular-dynamic-components-bindings/) • [📖 Read Article](https://medium.com/javascript-in-plain-english/angular-20-how-dynamic-components-went-from-nightmare-to-dream-or-the-great-clean-up-of-2025-78d9df2f5a58) • [⭐ Star on GitHub](https://github.com/rogeriolaa/angular-dynamic-components-bindings)

</div>

---

## 🌟 What's This About?

Angular 20 revolutionized dynamic component creation with new binding APIs that make programmatic component rendering as easy as template binding. This interactive demo showcases these powerful new features through a beautiful, hands-on interface.

### 🎯 What You'll Experience

- **Input Binding API** - Clean, declarative input binding with automatic signal tracking
- **Two-Way Binding API** - Effortless bidirectional data binding without manual subscriptions
- **Output Binding API** - Simple event handling with proper TypeScript support
- **Runtime Directives** - Apply directives to dynamic components at creation time
- **Modern Flow Control** - Using Angular 20's `@if` syntax instead of `*ngIf`
- **Signal Integration** - Full reactivity with Angular signals

## 🆚 Before vs After Angular 20

### The Old Way (Pre-Angular 20) 😩

```
// Manual input setting
componentRef.setInput('title', 'My Widget');
componentRef.setInput('collapsed', this.compactMode());

// Manual output subscriptions (memory leak prone)
this.subscriptions.push(
    componentRef.instance.closed.subscribe(() => {
        this.destroyComponent();
    })
);

// Manual two-way binding setup (complex)
this.subscriptions.push(
    componentRef.instance.collapsedChange.subscribe((value) => {
        this.compactMode.set(value);
    })
);

// Manual reactive updates
this.subscriptions.push(
    effect(() => {
        componentRef.setInput('collapsed', this.compactMode());
    })
);
```

### The New Way (Angular 20) ✨

```
// Clean, declarative, and reactive!
const componentRef = container.createComponent(WidgetComponent, {
    bindings: [
        inputBinding('title', () => 'My Widget'),
        twoWayBinding('collapsed', this.compactMode),
        outputBinding('closed', () => componentRef.destroy())
    ],
    directives: [HoverEffectDirective] // Runtime directives!
});
```

## 🎮 Interactive Features

### 📦 Dynamic Widget Components

- Create customizable widgets with different types (info, success, warning, danger)
- Real-time two-way binding synchronization
- Interactive collapse/expand functionality
- Action buttons with event handling
- Runtime hover effects and pulse animations

### 🔔 Dynamic Notification Components

- Auto-dismissing notifications with progress indicators
- Configurable duration and styling
- Multiple notification types
- Clean removal and memory management

### 📊 Live Statistics

- Real-time component creation counters
- Action performance tracking
- Active component monitoring

### 💻 Live Code Examples

- See the actual code used to create each component
- Compare old vs new approaches
- Copy-paste ready examples

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 9+
- Angular CLI 20+

## 🎨 Tech Stack

- **Angular 20** - Latest version with new dynamic component APIs
- **TypeScript 5.4** - Full type safety and modern JavaScript features
- **Bulma CSS** - Modern, responsive CSS framework
- **Font Awesome** - Beautiful icons
- **Angular Signals** - Reactive state management

## 🌟 Key Benefits Demonstrated

### 1. **90% Less Boilerplate Code**

Compare the before/after examples to see dramatic code reduction

### 2. **Automatic Memory Management**

No more manual subscription cleanup - Angular handles it all

### 3. **Built-in Reactivity**

Signals work seamlessly with dynamic components

### 4. **Type Safety**

Full TypeScript support with proper generics for outputs

### 5. **Consistent API**

Same patterns as template binding - learn once, use everywhere

### 6. **Runtime Directives**

Apply directives to dynamic components at creation time

## 🎯 Use Cases

This demo is perfect for developers who need to:

- Create dashboard widgets dynamically
- Build notification systems
- Implement dynamic forms
- Create plugin architectures
- Build configurable UIs
- Render components based on API data

## 🏆 Features Showcase

- ✅ **Input Binding** - Clean, declarative input binding
- ✅ **Two-Way Binding** - Automatic synchronization without subscriptions
- ✅ **Output Binding** - Type-safe event handling
- ✅ **Runtime Directives** - Apply directives dynamically
- ✅ **Modern Syntax** - Angular 20's `@if` flow control
- ✅ **Signal Integration** - Full reactivity with signals
- ✅ **Memory Safe** - Automatic cleanup and leak prevention
- ✅ **TypeScript** - Full type safety throughout
- ✅ **Responsive UI** - Beautiful Bulma-powered interface
- ✅ **Live Examples** - See code in action

**If this demo helped you understand Angular 20's dynamic components, please give it a ⭐!**

Made with ❤️ for the Angular community

</div>
