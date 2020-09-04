declare module "simple-fitbit-settings/app" {
    function initialize<T>(settings: T, callback: (newSettings: T) => void): void;
}