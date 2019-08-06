import * as actions from "../actions";

// const initialState = {
//     currentMetric: '',
//     metricData: null,
// };

const metricDataRecevied = (state, action) => {
    console.log(action, 'action')
    console.log(state, 'state')
  const { newMeasurement } = action;
  console.log(newMeasurement, 'NEW')
    let measure;
    
  return {
    ...state,
    metricData: [...state.metricData, newMeasurement]
  };
};

const handlers = {
  [actions.ADD_SUBSCRIPTION_DATA]: metricDataRecevied
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
