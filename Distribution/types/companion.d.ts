declare module "simple-fitbit-settings/companion" {
    function initialize(defaultSettings: any): void;
    function setDefaultSetting(key: string, value: any): void;
}