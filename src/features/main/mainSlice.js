import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getInteractionDetails, getAgentDetails } from './mainAPI';

const initialState = {
  success: false,
  agent: null,
  agentState: {},
  interactionState: {},
  team: null,
  interaction: null,
  media: {},
  loading: false,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const getAgentDetailsThunk = createAsyncThunk('main/getAgentDetails', async () => {
  return await getAgentDetails();
  // The value we return becomes the `fulfilled` action payload
});

export const getInteractionDetailsThunk = createAsyncThunk('main/getInteractionDetails', async ({ interactionId }) => {
  return await getInteractionDetails(interactionId);
  // The value we return becomes the `fulfilled` action payload
});

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setCurrentAgentState: (state, action) => {
      state.agentState = action.payload || {};
    },
    setCurrentInteractionState: (state, action) => {
      state.interactionState = action.payload || {};
    },
  },
  // // The `reducers` field lets us define reducers and generate associated actions
  // reducers: {
  //   increment: (state) => {
  //     // Redux Toolkit allows us to write "mutating" logic in reducers. It
  //     // doesn't actually mutate the state because it uses the Immer library,
  //     // which detects changes to a "draft state" and produces a brand new
  //     // immutable state based off those changes
  //     state.value += 1;
  //   },
  //   decrement: (state) => {
  //     state.value -= 1;
  //   },
  //   // Use the PayloadAction type to declare the contents of `action.payload`
  //   incrementByAmount: (state, action) => {
  //     state.value += action.payload;
  //   },
  // },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: {
    [getAgentDetailsThunk.fulfilled]: (state, action) => {
      return { ...state, success: true, agent: action.payload, loading: false };
    },
    [getAgentDetailsThunk.pending]: state => {
      return { ...state, success: false, loading: true };
    },
    [getAgentDetailsThunk.rejected]: state => {
      return { ...state, success: false, loading: false };
    },
    [getInteractionDetailsThunk.fulfilled]: (state, action) => {
      return { ...state, success: true, interaction: action.payload, loading: false };
    },
    [getInteractionDetailsThunk.rejected]: state => {
      return { ...state, success: false, loading: false };
    },
    [getInteractionDetailsThunk.pending]: state => {
      return { ...state, success: false, loading: true };
    },
  },
});

export const { setCurrentAgentState, setCurrentInteractionState } = mainSlice.actions;
export default mainSlice.reducer;