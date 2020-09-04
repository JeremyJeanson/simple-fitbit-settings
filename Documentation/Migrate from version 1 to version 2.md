# Breaking changes
Version 2 have followin breacking changes:
- Removed `appSettings` const to allow fitbit SDK to make you app more compact.
- Removed `companionSettings` const to allow fitbit SDK to make you app more compact.

# New way to imports modules
From the device application (`app` folder) :
```ts
import * as appSettings from "simple-fitbit-settings/app";
```

From the companion application (`companion` folder) :
```ts
import * as companionSettings from "simple-fitbit-settings/companion";
```

# Comparaison of old an new fation
You should change your `companion` scrypt like this:
```git
- import { appSettings } from "simple-fitbit-settings/app";
+ import * as appSettings from "simple-fitbit-settings/app";
```

```git
- import { companionSettings } from "simple-fitbit-settings/companion";
+ import * as companionSettings from "simple-fitbit-settings/companion";
```