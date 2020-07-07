# Managing navigation in SharePoint Framework projects

[![NPM](https://nodei.co/npm/spfx-navigation.png?compact=true)](https://nodei.co/npm/spfx-navigation/)

SharePoint Framework handles it own navigation events. If you want to redirect from your code to another page, it will trigger a full page reload when you use `location.href = "<your-url>"`. This dependency allows you to define how you want to navigate to the page with partial or full page reloads.

## Installation

Run the following command to install the `spfx-navigation` dependency:

```
npm i spfx-navigation -S -E
```

## Usage

Once the dependency is installed to your project, you can make use of it as follows:

```typescript
import { Navigation } from 'spfx-navigation';

/* Navigation with partial page reload */
Navigation.navigate("<your-url>");

/* Navigation with full page reload */
Navigation.navigate("<your-url>", true);
```

## Issues

Experiencing issues? Please add these to the dependency its issue list: [SPFx navigation issues](https://github.com/estruyf/spfx-navigation/issues).

## Changes

### 1.2.2

- Fix build in the GitHub workflow