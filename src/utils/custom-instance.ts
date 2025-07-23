/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { StorageKeys, useLocalStorage } from '@/hooks/useLocalStorage';
import axios, { AxiosRequestConfig, Method } from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * Interface for the options to create a custom instance.
 */
export interface CustomInstanceOptions<TData, TVariables> extends AxiosRequestConfig {
  url: string;
  method: Method;
  data?: TVariables;
}

/**
 * Custom instance for making API requests.
 * @param {CustomInstanceOptions<TData, TVariables>} options - The options for the API request.
 * @returns {Promise<TData>} - A promise that resolves to the data returned by the API.
 */
export const customInstance = async <TData = unknown, TVariables = unknown>({
  url,
  method,
  data,
  ...config
}: CustomInstanceOptions<TData, TVariables>): Promise<TData> => {
  const token = localStorage.getItem(StorageKeys.TOKEN);

  const response = await axios({
    url,
    method,
    data,
    baseURL: BACKEND_URL, // <- base URL for the API
    headers: {
      Authorization: token ? `${token}` : '',
      ...config.headers, // merge with any passed-in headers
    },
    ...config, // <- contains headers, signal, etc.
  });

  return response.data;
};
