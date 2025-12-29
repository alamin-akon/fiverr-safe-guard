
export interface ConversionHistory {
  id: string;
  original: string;
  safe: string;
  timestamp: number;
}

export interface SafeguardRule {
  pattern: RegExp;
  replacement: (match: string) => string;
}

export enum ObfuscationLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}
