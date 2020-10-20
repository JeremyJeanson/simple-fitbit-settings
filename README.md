
# Simple Fitbit Settings

[![npm](https://img.shields.io/npm/dw/simple-fitbit-settings.svg?logo=npm&label=npm%20version)](https://www.npmjs.com/package/simple-fitbit-settings)

## Introduction
The goal of this module is to simplify management of settings inside Fitbit OS applications. It implements communication of settings from the companion to the device application, and the initialization of the companion User Interface (UI).

It could be used with typescript or JavaScript.
## Features
This module includes many features that will make you settings easy to use:
- Include scripts for the companion app and the device app.
- Type definitions for TypScript or JavaScript (with comments to visualize the documentation when you are coding).
- Manage your settings and default values from one place (it set the UI of the companion app with default states as expected).
- Manage your own setting class (you don't have to set and update values).

## How does it work?
The cornerstone of this is your own setting class. In the common folder, you could have a class like this (each property is the key used in your settings UI):
```ts
export class Settings {
  public showSomething: boolean = true;
  public colorBackground: string = "black";
  public colorForeground: string = "white";
}
```
From both side (companion app and device app), you will ignite the module with this an instance of this class:
- The companion app will set the UI in the state defined by the class (if the user had already set settings, UI will respect user settings).
- The device app will be set with the default settings (if the user had already set settings, this module will load those from a local file).
When the user change a setting, this one is sent to the device app via `sockets`. Only the key and the value of the settings are sent over sockets (a property `type` is added to the message to allow the device app to filter message and to avoid conflict with other communications).
From the device app, your own method is called with an instance of your own settings class (only the changed property is defined). At the launch of your app, this method is called. All properties defined by default or changed by the user are defined.
> The way to send settings form companion to device app and to store settings is inspired by the FitBit SDK sample ([sdk-moment](https://github.com/Fitbit/sdk-moment)).
# Installation
## 1. Install the module
You could use a any package manager to install this module. it was tested with npm and pnpm.
```sh
npm install simple-fitbit-settings --save-dev
```

## 2. Create your settings class
Add a file to define your settings class (example `settings.ts)` inside the companion folder.
Exemple:
```ts
import * as commonSettings from "simple-fitbit-settings/common";
export class Settings {
  // Key used with a Toggle control
  public showSomething: boolean = true;
  // Keys used with ColorSelect controls
  public colorBackground: string = "black";
  public colorForeground: string = "white";
  // Key used with a Select control
  public valueFromSelectControl: commonSettings.Selection = { selected: [0], values: [ { name: "Name to show", value: "Value" } ] };
}
```
Note:
- Each property is the key used in your settings UI.
- Your class should have one property (the quantity of properties is not limited).
- Values defined here will define the default values of the applications.

### 3. Initilize the device app
Inside the `app` folder the `index.ts` file have to :
- Import the setting module.
- Import the `settings.ts` file from the `common` folder.
- Define and instantiate a `_settings` variable to know the settings state from the device app side (it could have on other name).
- Initialize the settings module with the `_settings` variable and a callback (to react when settings changes or at the application load).

Exemple:
```ts
// Import the settigns module
import * as appSettings from "simple-fitbit-settings/app";
// Import settings class from common folder
import { Settings } from "../common/settings";
// Current settings
const _settings = new Settings();
appSettings.initialize(
  // Default settings
  _settings,
  // callback when settings changed
  (newSettings: Settings) => {
      // Test if colorBackground changed
      if (newSettings.colorBackground !== undefined) {
          // Set color ...
          // newSettings.colorBackground contain the color to use
    }
    // ... more code to test all settings ..
  });
```
Note : initialize is a generic method. It allows this module to preserve your own type for settings. It will make your work easier with Visauls Studio Code and Typescript.

### 4. Initilize the companion app
Inside the `companion` folder the `index.ts` file have to :
- Import the setting module.
- Import the `settings.ts` file from the `common` folder.
- Initialize the setting module with an instance of your class settings (it will be used to define default values and set UI state at first load).

Exemple:
```ts
import * as companionSettings from "simple-fitbit-settings/companion";
import { Settings } from "../common/settings";
companionSettings.initialize(new Settings());
```

## Contribute or report issues
You can report any issue via GitHub, if you found one, please report it!
This code was open to be shared and improved. If you have an idea, tell it or send a pull request.

Keep in mind that this module is built for small devices. It does not have the goal to be a Swiss knife with hundreds of functions. It is why it is simple as possible.

## Compilation
This module was built with TypeScript. It uses Typescript to generate JavaScript files that are imported by the Fitbit SDK.

It includes the following npm scripts to:
- build (generate JavaScript files, delclarations, and copy all requested files to the `./distribution` directory).
- clean (remove generated files from the `./distribution` directory).