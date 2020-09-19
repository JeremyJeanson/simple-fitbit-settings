/**
 * Data received from companion app to set one setting
 */
export interface MessageData {
    type: string;
    key: string;
    value: string;
}
/**
 * Selection returned by Select control
 */
export interface Selection {
    /**
     * Index of the option in the full options list of the control
     */
    selected: number[];
    /**
     * Options with values selected by the user
     */
    values: Option[];
}
/**
 * Option used to contain the value in Select control
 */
export interface Option {
    name: string;
    value: string;
}
