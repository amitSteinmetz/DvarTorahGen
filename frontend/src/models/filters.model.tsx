export interface Filters {
  topic: string;
  parasha?: string; // Optional, only if topic is "פרשת שבוע"
  style: string;
  length: number;
}
