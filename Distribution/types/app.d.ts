declare module "simple-fitbit-settings/app" {
    interface AppSettings {
        initialize<T>(settings: T, callback: (newSettings: T) => void): void;
    }
    const appSettings:AppSettings;
}