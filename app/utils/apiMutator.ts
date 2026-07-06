import axios, { type AxiosRequestConfig, type AxiosError } from 'axios';

/*
 * Shared axios instance for all orval-generated API calls.
 * baseURL/timeout come from runtimeConfig so they can differ per environment
 * without regenerating the client.
 */
function createApiInstance() {
    const config = useRuntimeConfig();

    const instance = axios.create({
        baseURL: config.public.apiBaseUrl,
        timeout: Number(config.public.axiosTimeout)
    });

    instance.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => Promise.reject(error)
    );

    return instance;
}

/*
 * Orval axios mutator: every generated api/index.ts function calls this.
 * @param config axios request config produced by orval from the OpenAPI operation
 * @returns the response payload (unwrapped from AxiosResponse)
 */
export async function apiMutator<T>(config: AxiosRequestConfig): Promise<T> {
    const { data } = await createApiInstance().request<T>(config);
    return data;
}

export default apiMutator;
