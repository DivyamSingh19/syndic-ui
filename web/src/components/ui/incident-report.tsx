import React from 'react';
import {
  BarChart,
  BarSeries,
  Bar,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLabel,
  GridlineSeries,
  Gridline
} from 'reaviz';

const mediumCategoryData = [
  { key: 'A', data: 10 },
  { key: 'B', data: 15 },
  { key: 'C', data: 7 },
  { key: 'D', data: 20 },
  { key: 'E', data: 12 },
  { key: 'F', data: 18 },
  { key: 'G', data: 9 },
];

const IncidentReportCard = () => {

  const chartAvailableWidth = 200;

  const headerHeightEstimate = 90;
  const chartAvailableHeight = 354 - headerHeightEstimate; 

  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-center p-7 pt-6 pb-8 font-bold text-white">
       Stats
      </h3>
      <div style={{ flexGrow: 1 }}>
        <BarChart
          width={chartAvailableWidth}
          height={chartAvailableHeight}
          data={mediumCategoryData}
          yAxis={<LinearYAxis axisLine={null} tickSeries={<LinearYAxisTickSeries line={null} label={null} />} />}
          xAxis={<LinearXAxis type="category" tickSeries={<LinearXAxisTickSeries label={<LinearXAxisTickLabel padding={10} rotation={-45} format={text => `${text.slice(0, 5)}`} />} tickSize={30} />} />}
          series={<BarSeries bar={<Bar glow={{ blur: 20, opacity: 0.5 }} gradient={null} />} colorScheme={['#5B14C5', '#9152EE', '#40E5D1', '#A840E8', '#4C86FF', '#0D4ED2', '#40D3F4']} padding={0.2} />}
          gridlines={<GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />}
        />
      </div>
    </div>
  );
};

export default IncidentReportCard;