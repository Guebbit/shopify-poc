import type { Product } from '@api';
import { GetProductResponse } from '@api/schemas';
import { PRODUCT_DETAIL_QUERY } from '~/graphql/product';

/*
 * Fetches the exercise product configured in runtimeConfig.
 * @returns fetchProduct returning the contract Product
 */
export function useProduct() {
    const { $shopify } = useNuxtApp();
    const { shopifyProductGid } = useRuntimeConfig().public;

    /*
     * Fetch the configured product and map it to the OpenAPI Product contract,
     * validated at the boundary with the generated zod schema.
     * @returns contract Product; throws when product/variant is missing or the shape drifts
     */
    function fetchProduct(): Promise<Product> {
        return $shopify
            .query({ query: PRODUCT_DETAIL_QUERY, variables: { id: shopifyProductGid } })
            .then(({ data }) => {
                const product = data?.product;
                const variant = product?.variants.nodes[0];
                if (!product || !variant) {
                    throw new Error('Product not found');
                }
                // Compare-at only counts as a deal when higher than the current price.
                const compareAt = variant.compareAtPrice ?? undefined;
                const hasDeal =
                    compareAt && Number(compareAt.amount) > Number(variant.price.amount);
                return GetProductResponse.parse({
                    id: product.id,
                    title: product.title,
                    vendor: product.vendor,
                    image: product.featuredImage
                        ? {
                              url: product.featuredImage.url,
                              altText: product.featuredImage.altText ?? undefined
                          }
                        : undefined,
                    variant: {
                        id: variant.id,
                        availableForSale: variant.availableForSale,
                        price: variant.price,
                        compareAtPrice: hasDeal ? compareAt : undefined
                    }
                });
            });
    }

    return { fetchProduct };
}
