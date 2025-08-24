// src/typings/index.d.ts

export interface Presence {
  _id: string;
  _dn: string;
  tag: string;
  pfp: string;
  platform: ClientPresenceStatusData;
  status: string;
  activities: Activity[];
  badges: string[];
  customStatus?: {
    name: string;
    createdTimestamp: number;
    emoji: string;
  };
}

export interface Activity {
  applicationId: string;
  assets: {
    largeImage: string;
    largeText: string;
    smallImage: string;
    smallText: string;
  };
  details: string;
  emoji: string;
  name: string;
  state: string;
  title: string;
  timestamps: {
    start: Date;
    end: Date;
  };
  type: string;
}

export interface ClientPresenceStatusData {
  [key: string]: unknown;
}

export interface PresenceCardProps {
  presence: Presence | null;
  date: Date;
  direction: 'top' | 'bottom' | 'left' | 'right';
  span: 1 | 2;
  gradient: string;
  delay: number;
}
