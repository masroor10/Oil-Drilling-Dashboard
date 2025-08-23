// Each row of Excel is a WellData record
export type WellData = {
  depth: number;
  dt?: number;
  gr?: number;
  rockComposition: RockComposition;
} & {
  [key: string]: string | number | undefined;
};

export interface RockComposition {
  sandstone?: number;
  limestone?: number;
  shale?: number;
  dolomite?: number;
  clay?: number;
  [key: string]: number | undefined;
}

export interface Well {
  id: string;
  name: string;
  depth: number;
  totalDepth?: number;
  status: 'active' | 'inactive' | 'drilling';
  location?: string;
  operator?: string;
  records?: WellData[]; // <- add this
  [key: string]: string | number | WellData[] | undefined; // make sure records can exist
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface UploadStatus {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

export interface TabData {
  label: string;
  closable: boolean;
  id: string;
}

export interface DashboardState {
  activeTab: number;
  uploadedWells: Well[];
  selectedWell: Well | null;
}
