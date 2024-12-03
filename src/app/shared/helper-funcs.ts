export const SHARED = {
  roundTo2Decimals: (num: number): number => {
    return Math.round(num * 100) / 100;
  }
}