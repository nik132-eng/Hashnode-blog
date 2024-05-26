// import { UploadFile } from "@mui/icons-material";

export interface NotificationMessage {
    title: string;
    message: string;
  }
  
  export const API_NOTIFICATION_MESSAGES: { [key: string]: NotificationMessage } = {
    loading: {
      title: "Loading...",
      message: "Data is being loaded. Please wait",
    },
    success: {
      title: "Success",
      message: "Data successfully loaded",
    },
    requestFailure: {
      title: "Error!",
      message: "An error occurred while parsing request data",
    },
    responseFailure: {
      title: "Error!",
      message: "An error occurred while fetching response from server. Please try again",
    },
    networkError: {
      title: "Error!",
      message: "Unable to connect to the server. Please check internet connectivity and try again.",
    },
  };
  
  // Define the type for service URL configuration
  export interface ServiceURLConfig {
    url: string;
    method: 'POST' | 'GET' | 'PUT' | 'DELETE';
    responseType?: ResponseType;
    params?: any; 
    query?: any; 
    TYPE?: any;
  }
  
  // Define the SERVICE_URLS constant with the correct types
  export const SERVICE_URLS: { [key: string]: ServiceURLConfig } = {
    userSignup: { url: '/signup', method: 'POST' },
    userLogin: { url: '/login', method: 'POST' },
    uploadFile: { url: '/file/upload', method: 'POST'},
    createPost: { url: 'create', method: 'POST' },
    getAllPosts: { url: '/posts', method: 'GET', params: true },
    getPostById: { url: '/post', method: 'GET', query: true },
  };
  