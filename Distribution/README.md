# Download

# Introdution
The goal of this module is to reduce the time to implement settings coomunication inside of your Fitbit OS application.

It could be used with with typescript or javascript.

# Features
This module include many features that will make you settings journey a success:
- Include scripts for companion and app.
- Include types to use with Typescript.
- Manage your settings and default values from one place (it set the UI of companion with default states as expected).
- Manage your own settings class (you don't have to set and update values).

# How does it work?
The cornerstone of this is your own settings class. In you common folder, you could have a classe like this (each property is the key used in your settings UI):
```ts
export class Settings {
  public showSomething: boolean = true;
  public colorBackground: string = "black";
  public colorForeground: string = "white";
}
```
From both side (compagnion and app), you will ignite a the module with this an instance of this class:
- The companion app will set the UI in the state defined by the class (if the user had allready set settings, UI will respect users settings).
- The device app will be set with the default settings (if the user had allready set settings, this module will load those from a local file).

When the user change a setting, this one is send to the device app via `socket`. Only the key and the value of the settings are send over sockets (a property `type` is added to the message to allow the device app to filter message and to avoid to conflict with others communications).

From the device app, your own methode is called with an instance of your own settings class (only the changed property is defined). At the launch of your app, this method is called. All properties defined by default or changed by the user are defined.

Exemple:
```ts
import { appSettings } from "simple-fitbit-settings/app";
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
Note : initialize is a generic methode. It allow this module to preserve you own type for serrtings. It will make your work easier with Visauls Studio Code and Typescript.

> The way to send settings form companion to device app and to store settings is inspired by the FitBit SDK sample ([sdk-moment](https://github.com/Fitbit/sdk-moment)).

# Installation

## 1. Install the module
You could use a any package manager to install this module. it was tested with npm and pnpm.
```sh
npm install simple-fitbit-settings --save-dev
```

## 2. Include types (for Typescript projects only)
Update the `tsconfig.json` inside the app folder.
```json
{
	"extends": "../tsconfig.json",
	"include": [
		"**/*.ts",
		"../node_modules/fitbit-sdk-types/types/device",
		"../node_modules/simple-fitbit-settings/types"
	]
}
```

Update the `tsconfig.json` inside the companion folder.
```json
{
	"extends": "../tsconfig.json",
	"include": [
		"../node_modules/fitbit-sdk-types/types/companion",
		"../node_modules/simple-fitbit-settings/types",
		"**/*.ts"
	]
}
```

## 3. Create your settings class
Add a file to define your settings class exemple `settings.ts` inside the companion folder.
```ts
export class Settings {
  public showSomething: boolean = true;
  public colorBackground: string = "black";
  public colorForeground: string = "white";
}
```

## 4. Initilize the device app

## 5. Initilize the companion app

# Contribute or report issues
Your can report any issue via GitHub, if you found one, please report it!

This code was open to be shared and improved. If you have an idea, tell it or sedn a pull request.

Keep in mind that this module is build for small deveices. It hasn't goal to be a swissknife with hundred of function. It is why it is simple as possible.

# Compilation
This module was build with Typescript. It use Typescript to generate javascript files that are import by the Fitbit SDK.

It include the following npm scripts to:
- build (générate javascript files and copy all requested files to the `./distribution` directory)
- clean (remowe generated files from the `./distribution` directory)

Types are inside the `./distribution/types` directory. If you change exported methodes or class, think to update those files.