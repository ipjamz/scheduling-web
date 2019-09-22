export const updateUserState = (state, user) => {
  state.user = user
}
export const updateUserSchedulesState = (state, schedules) => {
  state.user.schedules = schedules
}
