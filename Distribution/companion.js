import * as messaging from "messaging";
import { settingsStorage } from "settings";
export function initialize(defaultSettings) {
    settingsStorage.onchange = function (e) {
        if (e.oldValue !== e.newValue && e.newValue !== undefined) {
            sendValue(e.key, e.newValue);
        }
    };
    setDefaultSettings(defaultSettings);
}
function sendValue(key, val) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        var message = {
            type: "setting",
            key: key,
            value: JSON.parse(val)
        };
        messaging.peerSocket.send(message);
    }
    else {
        console.warn("No peerSocket connection");
    }
}
function setDefaultSettings(defaultSettings) {
    for (var key in defaultSettings) {
        var value = defaultSettings[key];
        if (value !== undefined) {
            setDefaultSetting(key, value);
        }
    }
}
export function setDefaultSetting(key, value) {
    if (getSetting(key) === null) {
        setSetting(key, value);
    }
}
function getSetting(key) {
    try {
        return settingsStorage.getItem(key);
    }
    catch (ex) {
        return null;
    }
}
function setSetting(key, value) {
    try {
        settingsStorage.setItem(key, JSON.stringify(value));
    }
    catch (ex) {
    }
}
