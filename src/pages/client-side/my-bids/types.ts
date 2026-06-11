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
  bid_game_name?:string,
  bid_user_id: number,
  bid_market_id: number,
  id: number;
  bid_type_id: string;
  bid_digit: string;
  bid_point: number;
  bid_session:string;
  bid_date:string;
}

export const GAME_TYPE_LIST = [
  GameType.ANK,
  GameType.JODI,
  GameType.PANA,
];

export const JODI_SUB_LIST = [
  JodiSubType.JODI,
  // JodiSubType.FAMILY_JODI,
];

export const PANA_SUB_LIST = [
  PanaSubType.SPANA,
  PanaSubType.DPANA,
  PanaSubType.TPANA,
  // PanaSubType.FAMILY_PANA,
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

/* Helper functions for digit generation */

export const generateAnkDigits = () => {
  return Array.from({ length: 10 }, (_, i) => String(i));
};

export const generateJodiDigitPairs = () => {
  const pairs = [];
  for (let i = 0; i < 100; i++) {
    pairs.push(String(i).padStart(2, "0"));
  }
  return pairs;
};

// export const generatePanaDigits = () => {
//   const digits = [];
//   for (let i = 0; i < 1000; i++) {
//     digits.push(String(i).padStart(3, "0"));
//   }
//   return digits;
// };

export const generatePanaDigits = (type = "Spana") => {
  const result = [];

  for (let i = 100; i < 1000; i++) {
    const pana = String(i);
    const [a, b, c] = pana;

    // ❌ leading zero not allowed
    if (a === "0") continue;

    // ❌ middle zero not allowed
    if (b === "0") continue;

    // ❌ allow zero only at end (so if zero exists, must be c)
    if (c === "0") {
      // ok only if no duplicates with 0 rule
      // continue validation
    }

    const isTP = a === b && b === c;
    const isDP = !isTP && (a === b || b === c || a === c);
    const isSP = !isTP && !isDP;

    // extra strict SP rule: digits must be unique
    const unique = new Set([a, b, c]).size === 3;

    if (
      (type === "Spana" && isSP && unique) ||
      (type === "Dpana" && isDP) ||
      (type === "Tpana" && isTP)
    ) {
      result.push(pana);
    }
  }

  return result;
};


export const BID_TYPE_OPTIONS = [
  "Open",
  "Close",
];