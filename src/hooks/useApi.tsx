import Axios from "axios";

declare var process: {
	env: {
		REACT_APP_MOBAL_APIURL: string;
		REACT_APP_MOBAL_API_TOKEN: string;
	};
};

export default Axios.create({
	baseURL: process.env.REACT_APP_MOBAL_APIURL,
	headers: {
		authorization: process.env.REACT_APP_MOBAL_API_TOKEN,
	},
});
