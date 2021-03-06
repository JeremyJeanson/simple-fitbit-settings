import { me } from "appbit";
import * as fs from "fs";
import * as messaging from "messaging";
import { MessageData } from "../common";

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";

let _settings: Record<string, unknown>;

/**
 * Initialize settings
 * @param settings that will be managed by the module
 * @param callback to receive changin settings
 */
export function initialize<T>(settings: T, callback: (newSettings: T) => void): void {
  // Save args
  _settings = settings as Record<string, unknown>;
  // load settings from file adn update values
  loadSettings();
  addEventListeners(callback);
  // Send the full settings for first load from settings
  callback(_settings as T);
}

function addEventListeners<T>(callback: (newSettings: T) => void): void {
  /**
   * Received message containing settings data
   */
  messaging.peerSocket.addEventListener("message", (evt) => {
    // Get data
    const data = evt.data as MessageData;
    // Test data type (it should be a setting)
    if (data.type === "setting") {
      // Update settings object
      _settings[data.key] = data.value;
      // Raise event with only the property changed
      const args = {};
      args[data.key] = data.value;
      callback(args as T);
    }
  });

  /**
   * Register for the unload event
   */
  me.addEventListener("unload", saveSettings);
}

/**
 * update settings
 */
function loadSettings() {
  const settings = getSettings();
  if (settings === undefined) return;
  // Update each property defined in file
  for (const key in settings) {
    // Get value
    const value = settings[key];
    // update settigns value if deined
    if (value !== undefined) {
      _settings[key] = value;
    }
  }
}

/**
 * Load settings from filesystem
 */
function getSettings(): Record<string, unknown> | undefined {
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  } catch (ex) {
    return undefined;
  }
}

/**
 * Save settings to the filesystem
 */
function saveSettings(): void {
  fs.writeFileSync(SETTINGS_FILE, _settings, SETTINGS_TYPE);
}