import * as actions from "../actions";

const initialState = {
    currentMetric: '',
    metricData: [],
};

const metricDataRecevied = (state, action) => {
    // console.log(action, 'action')
    // console.log(state, 'state')
  const { getMeasurements } = action;
  const { newMeasurement } = action;
  console.log(newMeasurement, 'NEW')
  let metric;
  metric = getMeasurements[0].metric;
  return {
    currentMetric: metric,
    metricData: getMeasurements
  };
};

const addSubscriptionData = (state, action) => {
  console.log(action, 'action')
  console.log(state, 'state')
const { newMeasurement } = action;
console.log(newMeasurement, 'NEW')
return {
  ...state,
  metricData: [...state.metricData, newMeasurement]
};
};

const handlers = {
  [actions.METRIC_DATA_RECEIVED]: metricDataRecevied,
  [actions.ADD_SUBSCRIPTION_DATA]: addSubscriptionData,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
