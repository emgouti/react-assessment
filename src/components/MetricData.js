import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import { useQuery } from "urql";
import LinearProgress from "@material-ui/core/LinearProgress";

const query = `
query getMeasurements($input: MeasurementQuery){
  getMeasurements(input: $input){
    metric
    at
    value
  }
}
`;

  const getMetricData = state => {
    console.log(state, 'state')
    const { metric, at, value } = state.metricData;
    return {
      metric,
      at,
      value
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
    const { metric, at, value } = useSelector(getMetricData);
  
    const [result] = useQuery({
      query,
      variables: {
        input: { metricName: metricName }
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
      null
    );
  };