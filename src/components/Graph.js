import React, { useContext } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import moment from 'moment';
// import { Store } from '../store/Store';


export default function Graph(props) {
//   const [state] = useContext(Store);
  let first;
  let last;
//   if (state.length > 1) {
//     first = state.data.first.at;
//     last = state.data.last.at;
//   }

  return (
    <ResponsiveContainer width="95%" height={500}>
      <LineChart
        width={1000}
        height={600}
        data={props.data}
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
