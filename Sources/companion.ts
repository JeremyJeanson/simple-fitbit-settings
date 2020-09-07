import * as messaging from "messaging";
import { settingsStorage } from "settings";
import { MessageData } from "./common";

/**
 * Initialize settings tools 
 * @param defaultSettings - Class with default settings
 */
export function initialize(defaultSettings: any): void {
  // Whensettings changed -> send the new value
  settingsStorage.onchange = (e) => {
    if (e.oldValue !== e.newValue && e.newValue !== undefined) {
      sendValue(e.key, e.newValue);
    }
  };

  // Init default settings
  setDefaultSettings(defaultSettings);
}

/**
 * Send value to the device app
 * @param key of the settings
 * @param value of the settings
 */
function sendValue(key: string, value: string): void {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    const message: MessageData = {
      type: "setting",
      key: key,
      value: JSON.parse(value)
    };
    messaging.peerSocket.send(message);
  } else {
    console.warn("No peerSocket connection");
  }
}

/**
 * Init default settings
 * @param defaultSettings 
 */
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

/**
 * Set defaut setting
 * @param key of setting to set 
 * @param value of setting to set
 */
export function setDefaultSetting(key: string, value: any): void {
  if (getSetting(key) === null) {
    setSetting(key, value);
  }
}

/**
 * try to get current setting (return null if not defined or error)
 * @param key 
 */
function getSetting(key: string): string {
  try {
    return settingsStorage.getItem(key);
  } catch (ex) {
    return null;
  }
}

/**
 * Set the setting
 * @param key 
 * @param value 
 */
function setSetting(key: string, value: any): void {
  try {
    settingsStorage.setItem(key, JSON.stringify(value));
  }
  catch (ex) {
    // nothing to do
  }
}