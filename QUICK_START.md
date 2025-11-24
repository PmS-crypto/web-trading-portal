# Trackk Web Portal - Quick Start Guide

## 🚀 What's Been Built

A comprehensive, production-ready foundation for the Trackk Web Portal - an advanced trading workspace designed for Gen Z and Millennial traders.

## ✨ Key Features Implemented

### 1. **Infinite Canvas Workspace** ✅
- Drag & drop widgets anywhere on the canvas
- Resizable and repositionable widgets
- Grid-based layout system (12 columns)
- Multiple widget types ready to use

### 2. **Widget System** ✅
Six widget types implemented:
- **Chart Widget**: Price charts with Recharts
- **Watchlist Widget**: Stock watchlist with real-time updates UI
- **Portfolio Widget**: Portfolio overview with pie chart
- **Trackk Score Widget**: AI sentiment score visualization
- **News Widget**: Market news feed
- **Order Book Widget**: Trading orders display

### 3. **Theme System** ✅
Six beautiful themes:
- Dark Mode (default)
- Cyberpunk
- Minimal
- Candy
- Retro Terminal
- Ocean

### 4. **AI Co-Pilot** ✅
- Conversational interface
- Floating sidebar
- Message history
- Action buttons
- Source attribution

### 5. **Navigation & Layout** ✅
- Collapsible sidebar
- Top bar with search
- Keyboard shortcuts
- Responsive design

### 6. **State Management** ✅
- Zustand stores for dashboard, watchlist, theme
- Type-safe with TypeScript
- Persistent theme preferences

## 📁 Project Structure

```
src/
├── app/                    # Next.js pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main dashboard
│   └── globals.css         # Global styles
├── components/
│   ├── dashboard/          # Dashboard & widgets
│   │   ├── Dashboard.tsx
│   │   ├── GridLayout.tsx
│   │   ├── WidgetRenderer.tsx
│   │   ├── WidgetPalette.tsx
│   │   └── widgets/        # Individual widgets
│   ├── layout/             # Layout components
│   │   ├── Sidebar.tsx
│   │   └── TopBar.tsx
│   ├── ai/                 # AI features
│   │   └── AICoPilot.tsx
│   └── common/             # Shared components
│       └── KeyboardShortcuts.tsx
├── store/                  # State management
│   ├── dashboardStore.ts
│   ├── watchlistStore.ts
│   └── themeStore.ts
├── lib/                    # Utilities
│   ├── api.ts              # API client
│   └── utils.ts            # Helpers
└── types/                  # TypeScript types
    └── index.ts
```

## 🎯 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open Browser
Navigate to `http://localhost:3000`

### 4. Try These Features
- **Add Widget**: Click the floating "+" button (bottom right)
- **Change Theme**: Click the Zap icon in top bar
- **Open AI Co-Pilot**: Click the Sparkles icon (bottom right)
- **Keyboard Shortcuts**: 
  - `⌘K` - Search
  - `⌘Shift+C` - Add chart widget
  - `⌘Shift+W` - Add watchlist widget

## 🎨 Customization

### Adding a New Widget

1. Create widget component:
```typescript
// src/components/dashboard/widgets/MyWidget.tsx
export function MyWidget({ config }: WidgetProps) {
  return <div>My Custom Widget</div>;
}
```

2. Register in WidgetRenderer:
```typescript
// src/components/dashboard/WidgetRenderer.tsx
case 'mywidget':
  return <MyWidget config={widget.config} />;
```

3. Add to palette:
```typescript
// src/components/dashboard/WidgetPalette.tsx
{ type: 'mywidget', label: 'My Widget', icon: MyIcon }
```

### Adding a New Theme

1. Add to themes array in `src/store/themeStore.ts`:
```typescript
{
  id: 'mytheme',
  name: 'My Theme',
  colors: {
    bg: '#000000',
    surface: '#111111',
    accent: '#ff0000',
    text: '#ffffff',
    textSecondary: '#888888',
  },
}
```

## 🔌 API Integration

The API client is ready in `src/lib/api.ts`. To connect to your backend:

1. Update `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://your-api.com
```

2. Use in components:
```typescript
import { stockApi } from '@/lib/api';

const stock = await stockApi.getStock('RELIANCE');
```

## 🎯 Next Steps

### Immediate (Week 1-2)
1. **TradingView Integration**
   - Install TradingView widget library
   - Replace Recharts with TradingView charts
   - Add technical indicators

2. **WebSocket Setup**
   - Connect to real-time data feed
   - Update widgets with live prices
   - Add connection status indicator

3. **Backend Integration**
   - Connect to Trackk API
   - Implement authentication
   - Fetch real stock data

### Short Term (Month 1)
- User authentication flow
- Layout persistence (save/load)
- Widget configuration modals
- Responsive design polish
- Error handling & loading states

### Medium Term (Months 2-3)
- Collaborative watchlists
- Real-time presence
- AI Co-Pilot backend
- Story Mode
- Advanced order types

## 📚 Documentation

- **[Design Guidelines](./DESIGN_GUIDELINES.md)** - Complete design system
- **[Implementation Roadmap](./IMPLEMENTATION_ROADMAP.md)** - Feature roadmap
- **[Setup Guide](./SETUP.md)** - Detailed setup instructions
- **[README](./README.md)** - Project overview

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Charts**: Recharts (ready for TradingView)
- **Grid**: React Grid Layout
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 🎨 Design Highlights

- **Dark-first**: Optimized for dark mode
- **Gen Z aesthetic**: Modern, vibrant, engaging
- **Power user friendly**: Keyboard shortcuts, customization
- **Accessible**: WCAG 2.1 AA compliant structure
- **Performant**: Optimized for 60fps animations

## 🚦 Status

### ✅ Complete
- Project structure
- Core components
- Widget system
- Theme system
- Navigation
- State management
- API client structure

### 🚧 In Progress
- Real-time data integration
- Backend API connection
- TradingView charts

### 📋 Planned
- Collaborative features
- Gamification
- Advanced analytics
- Widget marketplace

## 💡 Tips

1. **Development**: Use `npm run dev` for hot reload
2. **Type Checking**: Run `npm run type-check` before commits
3. **Linting**: Use `npm run lint` to catch issues
4. **Themes**: Test all themes to ensure consistency
5. **Widgets**: Start with simple widgets, add complexity gradually

## 🐛 Common Issues

### Widgets not dragging
- Check that `react-grid-layout` CSS is imported
- Verify widget has `widget-drag-handle` class

### Theme not applying
- Check browser console for CSS variable errors
- Verify theme colors are valid hex codes

### API errors
- Check `.env.local` configuration
- Verify API endpoint URLs
- Check network tab for CORS issues

## 📞 Support

For questions or issues:
1. Check documentation files
2. Review code comments
3. Check TypeScript types for API contracts

---

**Built with ❤️ for Gen Z traders**


