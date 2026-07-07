/*
 * useAsyncData with a TTL: reuses the session-cached payload while fresh,
 * hits the network when the entry is at least ttlMs old (0 = always network).
 * Only the initial load is served from cache; refresh()/watch always refetch.
 * Render-mode agnostic: timestamps live in useState, so they are per request
 * on the server and travel to the client in the payload — a fresh server
 * fetch is reused on hydration instead of being fetched twice.
 * Reactive keys are supported: pass a getter (e.g. locale-scoped keys) and a
 * key change refetches while each key keeps its own timestamped cache entry.
 * @param key useAsyncData payload key (string or getter/ref for reactive keys)
 * @param handler fetcher for the value
 * @param ttlMs freshness window in milliseconds
 * @returns useAsyncData result for the key
 */
export const useCachedAsyncData = <T>(
    key: MaybeRefOrGetter<string>,
    handler: () => Promise<T>,
    ttlMs: number
) => {
    // Cache metadata (not app state): fetch timestamps per useAsyncData key.
    const fetchedAt = useState<Record<string, number>>('cached-async-data', () => ({}));
    return useAsyncData<T>(
        key,
        () =>
            handler().then((data) => {
                fetchedAt.value[toValue(key)] = Date.now();
                return data;
            }),
        {
            getCachedData: (cacheKey, nuxtApp, context) => {
                if (context.cause !== 'initial') return;
                const at = fetchedAt.value[cacheKey];
                if (at === undefined || Date.now() - at >= ttlMs) return;
                return nuxtApp.payload.data[cacheKey] as T | undefined;
            }
        }
    );
};
