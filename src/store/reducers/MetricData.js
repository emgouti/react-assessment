import * as actions from "../actions";

const initialState = {
    metricData: null,
};

const metricDataRecevied = (state, action) => {
    console.log(action, 'action')
    console.log(state, 'state')
  const { getMeasurements } = action;

  return {
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
