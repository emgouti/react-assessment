import * as actions from "../actions";

const initialState = {
    metric: '',
    at: '',
    value: '',
    unit: ''
};

const metricDataRecevied = (state, action) => {
    console.log(action, 'action')
  const { getMeasurements } = action;
  const {
    metric,
    at,
    value,
    unit
  } = getMeasurements;

  return {
    metric,
    at,
    value,
    unit
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
