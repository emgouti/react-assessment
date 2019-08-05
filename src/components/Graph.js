import React, { useContext } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import moment from 'moment';


export default function Graph(props) {
  let { data } = props;
  // if(data){
  // data = props.data.slice(0, 1500)
  // }
  console.log(data, 'HRAP')
  return (
    <ResponsiveContainer width="95%" height={500}>
      <LineChart
        width={1000}
        height={600}
        data={data}
        margin={{
          top: 5, right: 0, left: 0, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="at"
          type="number"
          domain={['auto', 'auto']}
          tickFormatter={timeStr => moment(timeStr).format('HH:mm')}
        />
        <YAxis dataKey="value" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" />
      </LineChart>
    </ResponsiveContainer>
  );
}
