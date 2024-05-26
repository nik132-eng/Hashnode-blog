import { ServiceURLConfig } from "../constants/config";

export const getAccessToken = () => {
  return sessionStorage.getItem('accessToken');
}

export const getRefreshToken = () => {
  return sessionStorage.getItem('refreshToken');
}

export const setAccessToken = (accessToken: string) => {
  sessionStorage.setItem('accessToken', `Bearer ${accessToken}`);
}

export const setRefreshToken = (refreshToken: string) => {
  sessionStorage.setItem('refreshToken', `Bearer ${refreshToken}`);
}

export const getType = (value: ServiceURLConfig, body: any) => {
  console.log("🚀 ~ getType ~ value:", value, body)
  if (value.params) {
    return { params: body }
  } else if (value.query) {
    if (typeof body === 'object') {
      return { query: body._id }
    } else {
      return { query: body }
    }
  }
  return {};
}