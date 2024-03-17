import { AreaChart } from '@mantine/charts';
import React from 'react';

interface Props {
  areaChartData: { date: string; 達成率: number }[];
}

export const CustomAreaChart = (props: Props) => {
  const { areaChartData } = props;
  return (
    <AreaChart
      h={300}
      data={areaChartData}
      dataKey='date'
      tooltipAnimationDuration={200}
      unit='%'
      series={[
        { name: '達成率', color: 'indigo.6' },
        // { name: 'Oranges', color: 'blue.6' },
        // { name: 'Tomatoes', color: 'teal.6' },
      ]}
      curveType='bump'
      tickLine='xy'
      gridAxis='xy'
      className='bg-white p-6 rounded-md shadow-md'
    />
  );
};
