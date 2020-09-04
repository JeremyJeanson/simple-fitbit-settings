import { me } from "appbit";
import * as fs from "fs";
import * as messaging from "messaging";
var SETTINGS_TYPE = "cbor";
var SETTINGS_FILE = "settings.cbor";
var _settings;
var _onsettingschange;
export function initialize(settings, callback) {
    _settings = settings;
    _onsettingschange = callback;
    loadSettings();
    _onsettingschange(_settings);
}
messaging.peerSocket.addEventListener("message", function (evt) {
    var data = evt.data;
    if (data.type === "setting") {
        _settings[data.key] = data.value;
        var args = {};
        args[data.key] = data.value;
        _onsettingschange(args);
    }
});
me.addEventListener("unload", saveSettings);
function loadSettings() {
    var settings = getSettings();
    if (settings === undefined)
        return;
    for (var key in settings) {
        var value = settings[key];
        if (value !== undefined) {
            _settings[key] = value;
        }
    }
}
function getSettings() {
    try {
        return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
    }
    catch (ex) {
        return undefined;
    }
}
function saveSettings() {
    fs.writeFileSync(SETTINGS_FILE, _settings, SETTINGS_TYPE);
}
