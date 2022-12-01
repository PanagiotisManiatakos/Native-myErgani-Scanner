import axios from "axios";

const login = async ({ url, username, password }) =>
  await axios
    .post(`https://api.ergani.day-one.gr/d1services`, {
      url,
      data: {
        service: "login",
        username,
        password,
        appID: 2101,
      },
    })
    .then((res) => res.data)
    .catch((er) => ({ success: false, error: er.message }));

export default login;
