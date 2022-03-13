import { createSlice, configureStore } from '@reduxjs/toolkit';
import authReducer from './apiv2';


const initialUiState = { showSidebar: false };
const initialPendingState = { isPending: false };


const uiSlice = createSlice({
  name: 'ui',
  initialState: initialUiState,
  reducers: {
    toggleSidebar(state) {
      state.showSidebar = !state.showSidebar;
    },
  },
});

const pendingSlice = createSlice({
    name: 'pending',
    initialState: initialPendingState,
    reducers: {
      setPending(state, action) {
        state.isPending = action.payload;
      },
    },
  });

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        pending: pendingSlice.reducer,
        auth: authReducer,
    },
  });

export const { toggleSidebar } = uiSlice.actions;
export const { setPending } = pendingSlice.actions;
export default store;