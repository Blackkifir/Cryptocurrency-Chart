import { useEffect, useRef } from 'react';
import { createChart, CandlestickSeriesOptions } from 'lightweight-charts';

import Footer from "../components/Footer";
import Header from "../components/Header";

import './CryptoChart.css';
import { candleStickSeriesStyles } from './mocks/mockDataChart';

export default function CryptoChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  
  const generateRandomCandle = () => ({
    time: Math.floor(Date.now() / 1000),
    open: Math.random() * 100,
    high: Math.random() * 100,
    low: Math.random() * 100,
    close: Math.random() * 100,
  });

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 300,
        layout: {
          background: {
            color: '#1c1c1c',
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
      candlestickSeries.setData([]);

      const resizeObserver = new ResizeObserver(() => {
        if (chartContainerRef.current) {
          chart.resize(chartContainerRef.current.clientWidth, 300);
        }
      });
      resizeObserver.observe(chartContainerRef.current);

      return () => {
        resizeObserver.disconnect();
        chart.remove();
      };
    }
  }, []);

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