import { useEffect, useRef } from 'react';
import { createChart, CandlestickSeriesOptions } from 'lightweight-charts';
import { candleStickSeriesStyles } from './mocks/mockDataChart';
import { initialData } from './utils/generateCandle';

import Footer from "../components/Footer";
import Header from "../components/Header";

import './CryptoChart.css';

export default function CryptoChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);

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
      candlestickSeries.setData(initialData);

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