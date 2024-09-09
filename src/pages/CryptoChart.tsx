import { useEffect, useRef } from 'react';
import { createChart, LineSeriesOptions } from 'lightweight-charts';

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

      const lineSeries = chart.addLineSeries({
        color: 'rgb(13, 227, 202)',
        lineWidth: 2,
      } as LineSeriesOptions);

      lineSeries.setData([
        { time: '2019-04-11', value: 80.01 },
        { time: '2019-04-12', value: 96.63 },
        { time: '2019-04-13', value: 76.64 },
        { time: '2019-04-14', value: 81.89 },
        { time: '2019-04-15', value: 74.43 },
        { time: '2019-04-16', value: 80.01 },
        { time: '2019-04-17', value: 96.63 },
        { time: '2019-04-18', value: 76.64 },
        { time: '2019-04-19', value: 81.89 },
        { time: '2019-04-20', value: 74.43 },
      ]);

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