/** 
 * Data received from companion app to set one setting
 */
export interface MessageData {
  type: string; // Type to filter messages
  key: string; // Key of the setting to set
  value: string; // Value of the settting to set
}