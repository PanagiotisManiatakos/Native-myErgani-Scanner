import axios from "axios";

const authenticate = async ({ sn, clientID, company, branch, module, refID }) =>
  await axios
    .post(`https://api.ergani.day-one.gr/d1services`, {
      url: `https://${sn}.oncloud.gr/s1services`,
      sn,
      data: {
        service: "authenticate",
        clientID,
        company,
        branch,
        module,
        refID,
        appID: 2101,
      },
    })
    .then((res) => res.data)
    .catch((er) => ({ success: false, error: er.message }));
export default authenticate;
