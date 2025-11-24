# Dashboard Enhancements - High Agency & Deep Functionality

## Overview
This document outlines the comprehensive enhancements made to transform the Trackk Web Portal into a powerful, customizable trading workspace that gives users high agency and competes with advanced platforms like Zerodha's Kite.

## Key Principles Implemented

### 1. **From Fixed Layout to Configurability (Adaptive UI)**
- **Layout Presets System**: Quick-switch between pre-configured layouts (Day Trader, Researcher, Portfolio Manager, Minimal)
- **User Preferences Store**: Persistent personalization settings including:
  - Widget density (compact/comfortable/spacious)
  - Default order types and quantities
  - Research depth preferences
  - Notification settings
  - Keyboard shortcuts customization
- **Widget Customization**: Deep settings panel for each widget type
- **Grid System**: Flexible 12-column grid with drag-and-drop positioning

### 2. **From Opaque Score to Transparent Research**
- **Trackk Score Transparency**:
  - Expandable breakdown by category (Technicals, Sentiment, Fundamentals, Social)
  - Detailed factor-level analysis with trend indicators
  - Source attribution with confidence scores
  - Clickable links to original sources
  - Toggle between quick view and detailed breakdown
- **Research Depth Levels**: Basic, Intermediate, Advanced
- **Source Attribution**: Every claim backed by verifiable sources

## New Features

### Layout Preset Switcher
- **Location**: Top-right corner when on dashboard
- **Features**:
  - 4 pre-built layouts (Day Trader, Researcher, Portfolio Manager, Minimal)
  - One-click layout switching
  - Visual preview with widget count
  - Category-based organization
  - User can create and save custom layouts

### Widget Settings Panel
- **Access**: Click settings icon (⚙️) on any widget
- **Features**:
  - Widget-specific configuration options
  - Chart widgets: Symbol, interval, indicators, volume toggle
  - Watchlist widgets: Name, sort order
  - Real-time preview of changes
  - Save/Reset functionality

### Enhanced Trackk Score Widget
- **Transparency Features**:
  - Toggle breakdown visibility
  - Expandable category details
  - Factor-level analysis (RSI, MACD, Revenue Growth, etc.)
  - Trend indicators (up/down/neutral)
  - Source attribution panel
  - Confidence scores for each source
  - Direct links to source materials
- **User Preferences Integration**:
  - Respects `showScoreBreakdown` preference
  - Respects `showSourceAttribution` preference
  - Adapts to `researchDepth` setting

### User Preferences System
- **Persistent Storage**: Preferences saved to localStorage
- **Categories**:
  - **Layout & UI**: Default layout, widget density, grid settings
  - **Trading**: Default order types, quantities, advanced features
  - **Research**: Score breakdown, source attribution, depth level
  - **Notifications**: Granular control over alerts
  - **Keyboard Shortcuts**: Customizable hotkeys
  - **Widget Defaults**: Per-widget-type defaults

## Technical Implementation

### New Stores
1. **`userPreferencesStore.ts`**: Manages all user preferences with localStorage persistence
2. **`layoutPresetsStore.ts`**: Manages layout presets and quick-switching
3. **`widgetSettingsStore.ts`**: Manages widget settings panel state

### New Components
1. **`LayoutPresetSwitcher.tsx`**: Quick layout switching UI
2. **`WidgetSettingsPanel.tsx`**: Comprehensive widget configuration panel
3. **Enhanced `TrackkScoreWidget.tsx`**: Full transparency with expandable breakdowns

### Integration Points
- Settings buttons in all widgets now open the settings panel
- Layout switcher appears on dashboard view
- Preferences automatically applied across the application
- Settings persist across sessions

## User Journey Improvements

### Comprehensive Action Journeys
Every user action now has a clear path:
1. **Adding Widgets**: Palette → Select → Configure → Place
2. **Customizing Widgets**: Click Settings → Modify → Save
3. **Switching Layouts**: Click Layouts → Select Preset → Apply
4. **Understanding Scores**: View Score → Toggle Breakdown → Expand Categories → View Sources
5. **Personalizing Experience**: Settings → Preferences → Customize → Save

### Subtle & Sublime Enhancements
- **Visual Feedback**: Hover states, transitions, and micro-interactions
- **Progressive Disclosure**: Information revealed on demand (expandable breakdowns)
- **Contextual Help**: Tooltips and info icons where needed
- **Smart Defaults**: Preferences guide initial setup
- **Non-Intrusive**: Features available but not forced

## Future Enhancements (Roadmap)

1. **Advanced Chart Configuration**: Full TradingView-style indicator library
2. **Widget Templates**: Pre-configured widget sets for common use cases
3. **Research Console**: Dedicated deep-dive research interface
4. **Context Menus**: Right-click actions throughout the interface
5. **Quick Actions Bar**: Floating action menu for common tasks
6. **Layout Builder**: Visual layout creation tool
7. **Widget Marketplace**: Community-shared widget configurations

## Usage Examples

### Switching to Day Trader Layout
1. Click "Layouts" button (top-right)
2. Select "Day Trader" preset
3. Dashboard instantly reorganizes with:
   - Multiple chart widgets
   - Order book
   - Active watchlist
   - Trackk Score

### Understanding a Trackk Score
1. View score widget
2. Click breakdown icon (📊) to show details
3. Click any category to expand (e.g., "Technicals")
4. See factor-level breakdown (RSI: 8.2 ↑)
5. View source attribution at bottom
6. Click source link to verify

### Customizing a Chart Widget
1. Click settings icon (⚙️) on chart widget
2. Change symbol, interval, or indicators
3. Toggle volume display
4. Click "Save"
5. Widget updates immediately

## Conclusion

These enhancements transform the Trackk Web Portal from a basic dashboard into a powerful, customizable trading workspace. Users now have:
- **High Agency**: Full control over their environment
- **Transparency**: Complete visibility into AI decisions
- **Depth**: Advanced features without complexity
- **Personalization**: Workspace adapts to their preferences

The platform now competes directly with advanced platforms while maintaining the intuitive, Gen Z-friendly interface that makes it accessible.

