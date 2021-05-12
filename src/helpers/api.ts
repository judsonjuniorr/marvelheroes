import useSWR, { SWRConfiguration, SWRResponse } from 'swr'
import axios, { AxiosRequestConfig } from 'axios'
import CryptoJS from 'crypto-js'

const timeStamp = new Date().getTime().toString()
const publicKey = process.env.REACT_APP_PUBLIC_KEY
const privateKey = process.env.REACT_APP_PRIVATE_KEY
const hash = CryptoJS.MD5(timeStamp + privateKey + publicKey).toString()

const api = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public',
  params: {
    ts: timeStamp,
    apikey: publicKey,
    hash
  }
})

export function useFetch<Data = unknown, Error = unknown>(
  url: string | null,
  options: AxiosRequestConfig = {},
  swrOptions: SWRConfiguration = {}
): SWRResponse<Data, Error> {
  const { data, error, mutate, revalidate, isValidating } = useSWR<Data, Error>(
    url,
    async (fetchUrl: string) => {
      const response = await api.get(fetchUrl, options)

      return response.data
    },
    swrOptions
  )

  return { data, error, mutate, revalidate, isValidating }
}

export default api
