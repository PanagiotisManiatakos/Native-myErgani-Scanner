const session = async (state = {}, action) => {
  switch (action.type) {
    case "SET_SESSION":
      await AsyncStorage.setItem("session", action.value);
      return action.value;
    default:
      return state;
  }
};

const login = async (state = {}, action) => {
  switch (action.type) {
    case "SET_LOGIN":
      await AsyncStorage.setItem("session", action.value);
      return action.value;
    default:
      return state;
  }
};

const reducer = (state = {}, action) => ({
  session: session(state.session, action),
  login: login(state.login, action),
});

export default reducer;
