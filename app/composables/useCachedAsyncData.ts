// Cache metadata (not app state): fetch timestamps per useAsyncData key.
const fetchedAt = new Map<string, number>();

/*
 * useAsyncData with a TTL: reuses the session-cached payload while fresh,
 * hits the network when the entry is older than ttlMs.
 * Only the initial load is served from cache; refresh()/watch always refetch.
 * @param key useAsyncData payload key
 * @param handler fetcher for the value
 * @param ttlMs freshness window in milliseconds
 * @returns useAsyncData result for the key
 */
export function useCachedAsyncData<T>(key: string, handler: () => Promise<T>, ttlMs: number) {
    return useAsyncData<T>(
        key,
        () =>
            handler().then((data) => {
                fetchedAt.set(key, Date.now());
                return data;
            }),
        {
            getCachedData: (cacheKey, nuxtApp, context) => {
                if (context.cause !== 'initial') return;
                const at = fetchedAt.get(cacheKey);
                if (at === undefined || Date.now() - at > ttlMs) return;
                return nuxtApp.payload.data[cacheKey] as T | undefined;
            }
        }
    );
}
