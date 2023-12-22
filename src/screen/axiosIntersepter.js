import axios from 'axios';

const axiosInstance = axios.create({
  headers: { Accept: 'application/json' },
});

axiosInstance.interceptors.request.use(
  async request => {
    console.log(
      `${new Date()} :: Request`,
      `${JSON.stringify(request, null, 2)}`,
    );
    return request;
  },
  error => {
    console.log(
      `${new Date()} :: Request ERROR`,
      `${JSON.stringify(error, null, 2)}`,
    );
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    // console.log('Response:', '---------------------------------------');
    // console.log('Request:', `${JSON.stringify(response.request?._perfKey)}`);
    console.log(
      `${new Date()} :: Response:`,
      ` ${new Date()} :: ${JSON.stringify(response, null, 2)}`,
    );
    return response;
  },
  error => {
    console.log(
      `${new Date()} :: Response ERROR`,
      `${JSON.stringify(error, null, 2)}`,
    );
    return Promise.reject(error);
  },
);

export default axiosInstance;
