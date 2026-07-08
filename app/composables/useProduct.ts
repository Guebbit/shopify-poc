import type { Product } from '@api';
import { GetProductResponse } from '@api/schemas';
import { ProductDetailDocument } from '@api/graphql';

/*
 * Fetches the exercise product configured in runtimeConfig.
 * @returns fetchProduct returning the contract Product
 */
export const useProduct = () => {
    const { $shopify } = useNuxtApp();
    const { shopifyProductGid } = useRuntimeConfig().public;
    const shopifyContext = useShopifyContext();

    /*
     * Fetch the configured product and map it to the OpenAPI Product contract,
     * validated at the boundary with the generated zod schema.
     * Localized via @inContext: title/altText translations and market pricing
     * follow the locale active at call time.
     * @returns contract Product; throws when product/variant is missing or the shape drifts
     */
    const fetchProduct = (): Promise<Product> => {
        return $shopify
            .query({
                query: ProductDetailDocument,
                variables: { id: shopifyProductGid, ...shopifyContext.value }
            })
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
                              altText: product.featuredImage.altText ?? undefined,
                              width: product.featuredImage.width ?? undefined,
                              height: product.featuredImage.height ?? undefined
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
    };

    return { fetchProduct };
};
