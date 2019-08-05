import * as actions from "../actions";

const initialState = {
    currentMetric: '',
    metricData: null,
};

const metricDataRecevied = (state, action) => {
    console.log(action, 'action')
    console.log(state, 'state')
  const { getMeasurements } = action;
  let metric;
  metric = getMeasurements[0].metric;
  return {
    currentMetric: metric,
    metricData: getMeasurements
  };
};

const handlers = {
  [actions.METRIC_DATA_RECEIVED]: metricDataRecevied
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
