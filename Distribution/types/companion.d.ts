declare module "simple-fitbit-settings/companion" {
    interface CompanionSettings {
        initialize(defaultSettings: any): void;
        setDefaultSetting(key: string, value: any): void;
    }
    const companionSettings: CompanionSettings;
}