# Breaking changes
Version 2 has following breaking changes:
- Removed `appSettings` const to allow Fitbit SDK to make you app more compact.
- Removed `companionSettings` const to allow Fitbit SDK to make you app more compact.
# New way to import modules
From the device application (`app` folder) :
```ts
import * as appSettings from "simple-fitbit-settings/app";
```
From the companion application (`companion` folder) :
```ts
import * as companionSettings from "simple-fitbit-settings/companion";
```
# Comparison of old and new codes
```git
- import { appSettings } from "simple-fitbit-settings/app";
+ import * as appSettings from "simple-fitbit-settings/app";
```
```git
- import { companionSettings } from "simple-fitbit-settings/companion";
+ import * as companionSettings from "simple-fitbit-settings/companion";
```