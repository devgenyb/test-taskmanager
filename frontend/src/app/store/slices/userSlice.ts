import { UserType } from "@/shared/types/userType";
import { createSlice } from "@reduxjs/toolkit";

type InitType = {
	user: UserType | null;
};

const initialState: InitType = {
	user: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, { payload }) => {
			state.user = payload;
		},

		resetUser: (state) => {
			state.user = null;
		},
	},
});


export const { setUser, resetUser } = userSlice.actions
