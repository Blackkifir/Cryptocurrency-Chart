import React from 'react';
import { createChart, CandlestickSeriesOptions, CandlestickData } from 'lightweight-charts';
import { candleStickSeriesStyles } from './mocks/mockDataChart';
import { initialData, generateRandomCandle } from './utils/generateCandle';

import Footer from "../components/Footer";
import Header from "../components/Header";

import './CryptoChart.css';

export default function CryptoChart() {
  const chartContainerRef = React.useRef<HTMLDivElement>(null);
  const [candlestickData, setCandleStickData] = React.useState<CandlestickData<number>[]>(initialData);
  const [isTouched, setIsTouched] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 300,
        layout: {
          background: {
            color: 'rgb(10, 10, 10)',
          },
          textColor: '#FFFFFF',
        },
        grid: {
          vertLines: {
            color: '#333',
            style: 1,
          },
          horzLines: {
            color: '#333',
            style: 1,
          },
        },
        crosshair: {
          mode: 0,
        },
      });

      const candlestickSeries = chart.addCandlestickSeries(candleStickSeriesStyles as CandlestickSeriesOptions);
      candlestickSeries.setData(candlestickData);

      const resizeObserver = new ResizeObserver(() => {
        if (chartContainerRef.current) {
          chart.resize(chartContainerRef.current.clientWidth, 300);
        }
      });
      resizeObserver.observe(chartContainerRef.current);

      const candleInterval = setInterval(() => {
        const newCandle = generateRandomCandle();
        candlestickSeries.update(newCandle);
      }, 10000);

      const handleClick = () => {
        setIsTouched(true);
      };

      chartContainerRef.current.addEventListener('click', handleClick);

      return () => {
        resizeObserver.disconnect();
        chart.remove();
        clearInterval(candleInterval);
        chartContainerRef.current?.removeEventListener('click', handleClick);
      };
    }
  }, [candlestickData]);

  React.useEffect(() => {
    if (isTouched) {
      const updatedData = candlestickData.map((candle) => ({
        ...candle,
        color: '#26a69a',
        borderColor: '#26a69a',
        wickColor: '#26a69a',
      }));
      setCandleStickData(updatedData);
    }
  }, [isTouched]);

  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <div ref={chartContainerRef} style={{ width: '100%', height: '300px' }} />
        </div>
      </main>
      <Footer />
    </>
  );
}