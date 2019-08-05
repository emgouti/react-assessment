import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import { useQuery } from "urql";
import LinearProgress from "@material-ui/core/LinearProgress";
import Graph from './Graph'

const query = `
query($input: MeasurementQuery){
  getMeasurements(input: $input){
    metric
    at
    value
  }
}
`;

  const getMetricData = state => {
    console.log(state, 'state in Comp')
    const { metricData } = state.metricData;
    console.log(metricData, 'state in Comp')

    return {
      metricData
    };
  };
  
  export default () => {
    return (
        <MetricData />
    );
  };
  
  const MetricData = () => {
    // Default to tubingPressure
    const metricName = 'tubingPressure';
    const dispatch = useDispatch();
    const { metricData } = useSelector(getMetricData);
  
    const [result] = useQuery({
      query,
      variables: {
        input: { metricName }
      }
    });
    const { fetching, data, error } = result;
    console.log(data, 'data')
    useEffect(
      () => {
        if (error) {
          dispatch({ type: actions.API_ERROR, error: error.message });
          return;
        }
        if (!data) return;
        const { getMeasurements } = data;
        dispatch({ type: actions.METRIC_DATA_RECEIVED, getMeasurements });
      },
      [dispatch, data, error]
    );
  
    if (fetching) return <LinearProgress />;
  
    return (
      <Graph data = {metricData}/>
    );
  };