# Trackk Web Portal - Design Guidelines

## Design Philosophy

**Mobile = Fast & Fun trades**  
**Web = Deep, immersive, social & productive workspace**

The Trackk web portal is designed as an advanced analytical workspace for users who have moved past the initial learning phase on mobile. It prioritizes **power, customization, data depth, and ethical control**.

## Core Design Principles

### 1. Infinite Canvas Workspace
- Drag & drop widgets anywhere on the canvas
- Multiple saved layouts (Morning Routine, F&O War Room, Weekend Research)
- Full customization of workspace arrangement
- Support for multi-monitor setups

### 2. Power User Features
- Keyboard shortcuts for all major actions
- Advanced charting with 100+ indicators
- Real-time data updates
- Professional-grade order management

### 3. Social & Collaborative
- Shared watchlists with real-time presence
- Community discussions
- Leaderboards and gamification
- Portfolio sharing

### 4. AI-Powered Intelligence
- Conversational AI co-pilot
- Transparent Trackk Score breakdown
- Personalized recommendations
- Predictive analytics

### 5. Ethical Design
- Risk acknowledgment modals
- Educational contextual prompts
- Opt-out for gamification
- Clear regulatory compliance

## Visual Design System

### Color Palette

#### Primary Colors
- **Primary Blue**: `#1890ff` - Main actions, links, accents
- **Success Green**: `#1BCF66` - Gains, positive indicators
- **Danger Red**: `#FF4757` - Losses, warnings, sell actions
- **Warning Orange**: `#FFB84D` - Medium risk, alerts

#### Theme Variants
1. **Dark Mode** (Default)
   - Background: `#0F1419`
   - Surface: `#1A1F2E`
   - Accent: `#1890ff`

2. **Cyberpunk**
   - Background: `#0a0e27`
   - Surface: `#141b2d`
   - Accent: `#00f5ff`
   - Neon: `#ff00ff`

3. **Minimal**
   - Background: `#ffffff`
   - Surface: `#f5f5f5`
   - Accent: `#000000`

4. **Candy**
   - Background: `#fff0f5`
   - Surface: `#ffe4e1`
   - Accent: `#ff69b4`

5. **Retro Terminal**
   - Background: `#1e1e1e`
   - Surface: `#2d2d2d`
   - Accent: `#00ff00`

6. **Ocean**
   - Background: `#0a1929`
   - Surface: `#132f4c`
   - Accent: `#00d4ff`

### Typography

- **Primary Font**: Inter (sans-serif)
- **Monospace Font**: JetBrains Mono (for code, numbers, data)

#### Font Sizes
- Display: 32px (Page titles)
- Headline: 20px (Section headers)
- Subheading: 16px (Card titles)
- Body: 14px (Primary text)
- Caption: 12px (Secondary info)
- Micro: 10px (Badges, labels)

### Spacing System

4px base grid system:
- 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px

### Component Patterns

#### Widgets
- Rounded corners: `8px` (lg)
- Border: `1px solid rgba(255,255,255,0.1)`
- Background: Surface color with slight transparency
- Drag handle: Visible on hover
- Settings: Top-right corner icon

#### Buttons
- Primary: Solid accent color, white text
- Secondary: Transparent with border
- Ghost: Transparent, hover state only
- Size variants: Small (32px), Medium (40px), Large (48px)

#### Cards
- Padding: 16px-24px
- Border radius: 12px
- Shadow: Subtle elevation on hover
- Hover state: Slight background color change

## Layout Structure

### Main Layout

```
┌───────────────────────────────────────────────────────────────┐
│  Top Bar → Search | AI Co-Pilot | Notifications | User        │
├──────────┬─────────────────────────────────────────────────────┤
│ Sidebar  │  Main Canvas Area (Infinite Grid)                  │
│ (64px)   │  → Draggable widgets                                │
│          │  → Multiple saved layouts                           │
│ • Home   │  → Right-click context menu                        │
│ • Watch  │                                                     │
│ • Screen │                                                     │
│ • Portfolio│                                                   │
│ • Leader │                                                     │
│ • Learn  │                                                     │
│ • Squads │                                                     │
│ • Settings│                                                    │
└──────────┴─────────────────────────────────────────────────────┘
```

### Widget Grid System

- 12-column grid (desktop)
- 10-column grid (tablet)
- 6-column grid (mobile)
- Row height: 60px
- Minimum widget size: 2x2
- Maximum widget size: 12x12

## Interaction Patterns

### Drag & Drop
- Visual feedback during drag
- Drop zones highlighted
- Snap to grid
- Collision detection

### Keyboard Shortcuts
- `⌘K` / `Ctrl+K`: Global search
- `⌘N` / `Ctrl+N`: New watchlist
- `⌘Shift+C`: Add chart widget
- `⌘Shift+W`: Add watchlist widget
- `⌘S`: Save layout
- `Esc`: Close modals

### Micro-interactions
- Smooth transitions (200-300ms)
- Hover states on all interactive elements
- Loading states with skeletons
- Success animations (confetti on profitable trades)
- Error states with clear messaging

## Responsive Breakpoints

- **Desktop**: 1200px+ (12 columns)
- **Tablet**: 996px - 1199px (10 columns)
- **Mobile**: 768px - 995px (6 columns)
- **Small Mobile**: < 768px (4 columns)

## Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation for all features
- Screen reader support
- High contrast mode support
- Focus indicators visible
- ARIA labels on all interactive elements

## Performance Targets

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Score: > 90
- 60fps animations
- Lazy loading for widgets
- Virtual scrolling for long lists

## Animation Guidelines

### Timing Functions
- Ease-out: Default transitions
- Ease-in-out: Hover states
- Spring: Celebratory animations

### Duration
- Micro: 100-200ms
- Standard: 200-300ms
- Complex: 300-500ms

### Principles
- Delight without distraction
- Reinforce user actions
- Provide feedback
- Maintain 60fps

## Content Guidelines

### Tone of Voice
- Confident but not arrogant
- Educational but not condescending
- Fun but professional
- Clear and concise

### Messaging
- Use active voice
- Avoid jargon (or explain it)
- Provide context
- Show, don't tell

## Component Library

### Core Components
- Button
- Input
- Select
- Card
- Modal
- Tooltip
- Dropdown
- Tabs
- Badge
- Avatar

### Trading-Specific Components
- StockCard
- PriceDisplay
- Chart
- OrderBook
- Watchlist
- Portfolio
- TrackkScore
- NewsFeed

## Implementation Notes

### State Management
- Zustand for global state
- React Query for server state
- Local state for UI-only concerns

### Data Fetching
- Real-time updates via WebSocket
- REST API for initial loads
- Optimistic updates for better UX

### Error Handling
- Graceful degradation
- Clear error messages
- Retry mechanisms
- Fallback UI

## Future Enhancements

1. Widget Marketplace
2. Custom Themes (user-created)
3. Advanced Analytics Dashboard
4. Paper Trading Simulator
5. Voice Commands
6. Gesture Controls
7. AR/VR Visualization


