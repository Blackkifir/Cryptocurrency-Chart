import { CandlestickData } from "lightweight-charts";

let lastCandleTime = Math.floor(Date.now() / 1000);

const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomNum: number = generateRandomNumber(1, 150);

export const generateRandomCandle = (): CandlestickData<number> => {
  lastCandleTime += 10;
  return {
    time: lastCandleTime,
    open: Math.random() * 100,
    high: Math.random() * 100,
    low: Math.random() * 100,
    close: Math.random() * 100,
  };
};

export const initialData: CandlestickData<number>[] = Array.from({ length: randomNum}, () => generateRandomCandle());