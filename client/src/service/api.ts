import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosProgressEvent,
} from "axios";
import {
  API_NOTIFICATION_MESSAGES,
  NotificationMessage,
  SERVICE_URLS,
} from "../constants/config";

interface APIResponse {
  isSuccess?: boolean;
  isFailure?: boolean;
  isError?: boolean;
  data?: any;
  status?: number;
  msg?: NotificationMessage;
  code?: string;
}

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  TYPE?: string;
}

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
} as ExtendedAxiosRequestConfig);

axiosInstance.interceptors.request.use(
  function (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    return config;
  },
  function (error: AxiosError): Promise<AxiosError> {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response: AxiosResponse): AxiosResponse {
    return response;
  },
  function (error: AxiosError): Promise<AxiosError> {
    return Promise.reject(processError(error));
  }
);

const processResponse = (response: AxiosResponse): APIResponse => {
  if (response?.status === 200) {
    return { isSuccess: true, data: response.data };
  } else {
    return {
      isFailure: true,
      status: response.status,
      msg: {
        title: "Error!",
        message: response.statusText,
      },
      code: response.config.url,
    };
  }
};

const processError = (error: AxiosError): APIResponse => {
  if (error.response) {
    console.log("ERROR IN RESPONSE: ", JSON.stringify(error));
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.responseFailure,
      code: error.response.status.toString(),
    };
  } else if (error.request) {
    console.log("ERROR IN REQUEST: ", JSON.stringify(error));
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.requestFailure,
      code: "",
    };
  } else {
    console.log("ERROR IN SETUP: ", JSON.stringify(error));
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.networkError,
      code: "",
    };
  }
};

const API: { [key: string]: Function } = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (
    body?: any,
    showUploadProgress?: (progress: number) => void,
    showDownloadProgress?: (progress: number) => void
  ) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      data: value.method === "DELETE" ? "" : body,
      responseType: value.responseType as
        | "arraybuffer"
        | "blob"
        | "document"
        | "json"
        | "text"
        | "stream",
      onUploadProgress: function (progressEvent: AxiosProgressEvent) {
        if (showUploadProgress && progressEvent.total) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showUploadProgress(percentCompleted);
        }
      },
      onDownloadProgress: function (progressEvent: AxiosProgressEvent) {
        if (showDownloadProgress && progressEvent.total) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showDownloadProgress(percentCompleted);
        }
      },
    })
      .then((response: AxiosResponse) => processResponse(response))
      .catch((error: AxiosError) => processError(error));
}

export { API };

// declare function getAccessToken(): string;
// declare function getType(value: any, body: any): string;
