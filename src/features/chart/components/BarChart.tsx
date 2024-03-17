import { BarChart } from '@mantine/charts';

interface Props {
  barChartData: { date: string; [key: string]: any }[];
}

export const CustomBarChart = (props: Props) => {
  const { barChartData } = props;
  return (
    <BarChart
      h={300}
      data={barChartData}
      dataKey='date'
      tooltipAnimationDuration={200}
      type='stacked'
      withLegend
      legendProps={{ verticalAlign: 'bottom', height: 50 }}
      series={[
        { name: '第1の習慣', color: 'red.6' },
        { name: '第2の習慣', color: 'yellow.6' },
        { name: '第3の習慣', color: 'teal.6' },
        { name: '第4の習慣', color: 'blue.6' },
      ]}
      tickLine='y'
      className='bg-white p-6 rounded-md shadow-md'
    />
  );
};
