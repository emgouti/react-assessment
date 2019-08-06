import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import { useQuery } from "urql";
import LinearProgress from "@material-ui/core/LinearProgress";
import Graph from './Graph'
import { useSubscription } from "urql";

const query = `
query($input: MeasurementQuery){
  getMeasurements(input: $input){
    metric
    at
    value
  }
}
`;

const newData = `
subscription {
  newMeasurement {
    metric
    at
    value
  }
}
`;

const queries = `
query($input: [MeasurementQuery]){
  getMultipleMeasurements(input: $input){
    metric
    measurements {
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
    // console.log(res, 'res')
    // Default to tubingPressure
    const metricName = 'tubingPressure';
    const dispatch = useDispatch();
    const { metricData } = useSelector(getMetricData);
  
    const handleSubscription = (metricData = [], response) => {
      // console.log(response, 'res')
      const { newMeasurement } = response.newMeasurement;
      dispatch({ type: actions.ADD_SUBSCRIPTION_DATA, newMeasurement})
      // return [response.newMeasurement, ...metricData];
    };

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

        // type & payload
        dispatch({ type: actions.METRIC_DATA_RECEIVED, getMeasurements });
      },
      [dispatch, data, error]
    );

    // const [res] = useSubscription({ query: newData }, handleSubscription);

    
  
    if (fetching) return <LinearProgress />;
  
    return (
      <Graph data = {metricData}/>
    );
  };