export enum GameType {
  ANK = "Ank",
  JODI = "Jodi",
  PANA = "Pana",
}

export enum AnkSubType {
  OPEN = "Open",
  CLOSE = "Close",
}

export enum JodiSubType {
  JODI = "Jodi",
  FAMILY_JODI = "Family Jodi",
}

export enum PanaSubType {
  SPANA = "Spana",
  DPANA = "Dpana",
  TPANA = "Tpana",
  FAMILY_PANA = "FamilyPana",
}

export interface BidEntry {
  id: number;
  bidType: string;
  digits: string;
  points: number;
}

export const GAME_TYPE_LIST = [
  GameType.ANK,
  GameType.JODI,
  GameType.PANA,
];

export const JODI_SUB_LIST = [
  JodiSubType.JODI,
  JodiSubType.FAMILY_JODI,
];

export const PANA_SUB_LIST = [
  PanaSubType.SPANA,
  PanaSubType.DPANA,
  PanaSubType.TPANA,
  PanaSubType.FAMILY_PANA,
];

export const ANK_SELECT_OPTIONS = [
  AnkSubType.OPEN,
  AnkSubType.CLOSE,
];

export const JODI_SELECT_OPTIONS = [
  JodiSubType.JODI,
];

export const PANA_SELECT_OPTIONS = [
  "SpOpen",
  "SpClose",
];

export const POINTS_OPTIONS = [
  100, 150, 200, 250, 300, 350, 400, 450,
  500, 600, 700, 800, 900, 1000, 1200, 1500,
];

export const INPUT_PLACEHOLDERS: Record<GameType, string> = {
  [GameType.ANK]: "Enter Digit",
  [GameType.JODI]: "Enter Jodi",
  [GameType.PANA]: "Enter Pana",
};