import React, { useContext } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import moment from 'moment';


export default function Graph(props) {
  let { data } = props;
  // for some reason, using the 'after' property isn't working,
  // it rerenders thousands of times instead..couldn't figure it out
  // so I'm just slicing the end of the array instead
  if(data){
  data = props.data.slice(Math.max(data.length - 1000, 1))
  }
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
        <Line type="monotone" dataKey="value" dot={false}  />
      </LineChart>
    </ResponsiveContainer>
  );
}
