import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type StudyData = {
  date: string;
  合計: number;
  達成数: number;
  達成率: number;
};

const studyDataList: StudyData[] = [
  {
    date: '01/29-02/04',
    合計: 100,
    達成数: 100,
    達成率: 88,
  },
  {
    date: '02/05-02/11',
    合計: 100,
    達成数: 100,
    達成率: 85,
  },
  {
    date: '02/12-02/18',
    合計: 100,
    達成数: 100,
    達成率: 90,
  },
  {
    date: '02/19-02/25',
    合計: 100,
    達成数: 100,
    達成率: 70,
  },
  // {
  //   date: '02/26-03/03',
  //   合計: 100,
  //   達成数: 100,
  //   達成率: 20,
  // },
  // {
  //   date: '03/04-03/10',
  //   合計: 100,
  //   達成数: 100,
  //   達成率: 22,
  // },
];


const pStyle = {
  color: '#f7f7f4',
};

const divStyle = {
  background: 'linear-gradient(to right, #2a52e3, #7280eedf)',
  fontWeight: 'bold',
  border: 'solid 2px blue',
};

export const AchievementChart = () => (
  <div className="container">
    <LineChart
      width={1000}
      height={600}
      data={studyDataList}
      margin={{
        top: 10,
        right: 40,
        left: 5,
        bottom: 15,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="date"
        interval={0}
        // angle={-30}
        dx={-10}
        dy={20}
        tick={{
          fontSize: 12,
          fill: "#f7f7f4",
        }}
      />
      <YAxis dataKey="合計" tickCount={5} />
      {/* <Line type="monotone" dataKey="達成数" stroke="#69ae31" strokeWidth={2} /> */}
      <Line type="monotone" dataKey="達成率" stroke="#d8e6ed" strokeWidth={2} />
      <Legend verticalAlign="top" height={30} iconSize={20} iconType="plainline" />
      <Tooltip contentStyle={divStyle} labelStyle={pStyle} />
    </LineChart>
  </div>
);
