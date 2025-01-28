import { createSlice } from "@reduxjs/toolkit";

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        events: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchEventsStart(state){
            state.loading = true;
            state.error = null;
        },
        fetchEventsSuccess(state, action){
            state.loading = false;
            state.events = action.payload;
        },
        fetchEventsError(state, action){
            state.loading = false;
            state.error = action.payload;
        },
        addEvent(state, action){
            state.events.push(action.payload);
        },
        editEvent(state, action){
            const index = state.events.findIndex(event => event.id !== action.payload.id);
            if(index !== -1){
                state.events[index] =action.payload;
            }
        },
        deleteEvent(state, action){
            state.events = state.events.filter(event => event.id !== action.payload.id);
        },
    },
});


export const {
    fetchEventsStart,
    fetchEventsSuccess,
    fetchEventsError,
    addEvent,
    editEvent,
    deleteEvent,
} = eventsSlice.actions;

export default eventsSlice.reducer;