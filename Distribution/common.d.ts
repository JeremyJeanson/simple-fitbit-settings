/**
 * Data received from companion app to set one setting
 */
export interface MessageData {
    type: string;
    key: string;
    value: string;
}
