const widgetAPI = window.WS.widgetAPI();

export function getCapabilities() {
  return widgetAPI.getCapabilities();
}

export function getAgentDetails() {
  return widgetAPI.getConfiguration()?.user;
}

export function getInteractionDetails(interactionId) {
  const widgetAPI = window.WS.widgetAPI(interactionId);
  return widgetAPI.getInteractionData();
}

export function subscribeToAgentState(callback) {
  widgetAPI.onDataEvent('onAgentStateEvent', callback);
}

export function subscribeToInteractionState(callback) {
  widgetAPI.onDataEvent('onAnyInteractionEvent', callback);
}
