import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
	name: 'task',
	initialState: null,
	reducers: {
		setTask(state, action) {
			return action.payload
		}
	}
})

export const { setTask } = taskSlice.actions