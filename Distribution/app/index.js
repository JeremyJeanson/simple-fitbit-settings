import { me } from "appbit";
import * as fs from "fs";
import * as messaging from "messaging";
var SETTINGS_TYPE = "cbor";
var SETTINGS_FILE = "settings.cbor";
var _settings;
/**
 * Initialize settings
 * @param settings that will be managed by the module
 * @param callback to receive changin settings
 */
export function initialize(settings, callback) {
    // Save args
    _settings = settings;
    // load settings from file adn update values
    loadSettings();
    addEventListeners(callback);
    // Send the full settings for first load from settings
    callback(_settings);
}
function addEventListeners(callback) {
    /**
     * Received message containing settings data
     */
    messaging.peerSocket.addEventListener("message", function (evt) {
        // Get data
        var data = evt.data;
        // Test data type (it should be a setting)
        if (data.type === "setting") {
            // Update settings object
            _settings[data.key] = data.value;
            // Raise event with only the property changed
            var args = {};
            args[data.key] = data.value;
            callback(args);
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
    var settings = getSettings();
    if (settings === undefined)
        return;
    // Update each property defined in file
    for (var key in settings) {
        // Get value
        var value = settings[key];
        // update settigns value if deined
        if (value !== undefined) {
            _settings[key] = value;
        }
    }
}
/**
 * Load settings from filesystem
 */
function getSettings() {
    try {
        return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
    }
    catch (ex) {
        return undefined;
    }
}
/**
 * Save settings to the filesystem
 */
function saveSettings() {
    fs.writeFileSync(SETTINGS_FILE, _settings, SETTINGS_TYPE);
}
