// src/index.ts — small curated exports for other packages to import
export const MajorArcana = [
  "Fool","Magician","High Priestess","Empress","Emperor","Hierophant","Lovers",
  "Chariot","Strength","Hermit","Wheel","Justice","Hanged Man","Death","Temperance",
  "Devil","Tower","Star","Moon","Sun","Judgment","World"
];

export type MinorSuit = "Wands" | "Cups" | "Swords" | "Pentacles";

export function getCardName(arc: string) {
  return arc;
}
