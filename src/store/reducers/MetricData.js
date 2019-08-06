import * as actions from "../actions";

const initialState = {
    currentMetric: '',
    metricData: [],
};

const metricDataRecevied = (state, action) => {
  const { getMeasurements } = action;
  let metric;
  metric = getMeasurements[0].metric;
  return {
    currentMetric: metric,
    metricData: getMeasurements
  };
};

const addSubscriptionData = (state, action) => {
  console.log(action, 'action')
  // console.log(state, 'state')
  const { subscriptionData } = action;
const { data } = subscriptionData;
let newData;
if(data){
   newData = data.filter(d => d.metric === state.currentMetric)
}
console.log(newData, 'NEWNEWNEWN')


return {
  ...state,
  metricData: state.metricData.concat(newData)
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
