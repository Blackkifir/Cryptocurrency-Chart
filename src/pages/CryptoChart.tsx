import React from 'react';
import { createChart, ISeriesApi } from 'lightweight-charts';
import { initialData } from './utils/generateCandle';
import Footer from "../components/Footer";
import Header from "../components/Header";

import './CryptoChart.css';

export default function CryptoChart() {
  const chartContainerRef = React.useRef<HTMLDivElement>(null);
  const candlestickSeriesRef = React.useRef<ISeriesApi<'Candlestick'> | null>(null);
  const [isMouseDown, setIsMouseDown] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any[]>(initialData);

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const generateCandle = (prevData: any): any => {
    const lastCandle = prevData || data[data.length - 1];
    const { close } = lastCandle;
    const change = isMouseDown ? Math.random() * 25 : -Math.random() * 25;
    const newClose = close + change;

    return {
      time: (lastCandle.time as number) + 10,
      open: close,
      high: Math.max(close, newClose),
      low: Math.min(close, newClose),
      close: newClose,
    };
  };

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

      const candlestickSeries = chart.addCandlestickSeries() as ISeriesApi<'Candlestick'>;
      candlestickSeries.setData(data);
      candlestickSeriesRef.current = candlestickSeries;

      const updateChartSize = () => {
        if (chartContainerRef.current) {
          chart.resize(chartContainerRef.current.clientWidth, 300);
        }
      };

      updateChartSize();

      const candleInterval = setInterval(() => {
        const lastCandle = data[data.length - 1];
        const newCandle = generateCandle(lastCandle);
        setData(prevData => [...prevData, newCandle]);
        candlestickSeries.update(newCandle);
      }, 10000);

      return () => {
        chart.remove();
        clearInterval(candleInterval);
      };
    }
  }, [data, isMouseDown]);

  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <div 
            ref={chartContainerRef} 
            style={{ width: '100%', height: '300px' }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}