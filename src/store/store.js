import { createWrapper } from "next-redux-wrapper"

const { configureStore } = require("@reduxjs/toolkit")
const { taskSlice } = require("./taskSlice")

export const store = configureStore({
	reducer: {
		"task": taskSlice.reducer
	},
	devTools: true
})