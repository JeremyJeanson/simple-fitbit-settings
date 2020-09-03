import * as messaging from "messaging";
import { settingsStorage } from "settings";
import { MessageData } from "./common";

// initialize settings tools
export class CompanionSettings {
  public initialize(defaultSettings: any): void {
    // Whensettings changed -> send the new value
    settingsStorage.onchange = (e) => {
      if (e.oldValue !== e.newValue && e.newValue !== undefined) {
        sendValue(e.key, e.newValue);
      }
    };

    // Init default settings
    setDefaultSettings(defaultSettings);
  }
}
export const companionSettings = new CompanionSettings();

// Send value to the device app
function sendValue(key: string, val: string): void {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    const message: MessageData = {
      type: "setting",
      key: key,
      value: JSON.parse(val)
    };
    messaging.peerSocket.send(message);
  } else {
    console.warn("No peerSocket connection");
  }
}

// Init default settings
function setDefaultSettings(defaultSettings: any): void {
  // For each properties of the settings class
  for (let key in defaultSettings) {
    // Get the value
    const value = defaultSettings[key];
    // Test if value is defined
    if (value !== undefined) {
      setDefaultSetting(key, value);
    }
  }
}

// Set defaut setting
export function setDefaultSetting(key: string, value: any): void {
  if (getSetting(key) === null) {
    setSetting(key, value);
  }
}

// try to get current setting (return null if not defined or error)
function getSetting(key: string): string {
  try {
    return settingsStorage.getItem(key);
  } catch (ex) {
    return null;
  }
}

// Set the setting
function setSetting(key: string, value: any): void {
  try {
    settingsStorage.setItem(key, JSON.stringify(value));
  }
  catch (ex) {
    // nothing to do
  }
}