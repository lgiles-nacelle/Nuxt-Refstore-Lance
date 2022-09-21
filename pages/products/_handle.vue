<template>
  <div v-if="product" class="productPage">
    <product-details :product="product" :content="content" />
    <site-section
      v-for="section in sections"
      :key="section._key"
      :content="section"
    />
    <product-review
      :product="product"
      :name="product.content.title"
      :url="url"
      :productid="productid"
      :currency="currency"
      :price="price"
      :imageurl="imageurl"
    />
  </div>
</template>

<script>
import { PRODUCT_PAGE_QUERY } from '~/queries/productPage';
import { buildMeta } from '~/utils/buildMeta';
import { resolvePageData } from '~/utils/resolvers';

import ProductDetails from '~/components/product/ProductDetails.vue';
import ProductReview from '~/components/product/ProductReview.vue';
import SiteSection from '~/components/section/Section.vue';

export default {
  name: 'ProductPage',
  components: {
    ProductDetails,
    SiteSection,
    ProductReview
  },

  async asyncData({ app, params }) {
    // console.log('query', {
    //   query: PRODUCT_PAGE_QUERY,
    //   variables: {
    //     handle: params.handle,
    //     pageHandle: `page-${params.handle}`
    //   }
    // });

    const { products, pages } = await app.$nacelle.query({
      query: PRODUCT_PAGE_QUERY,
      variables: {
        handle: params.handle,
        pageHandle: `page-${params.handle}`
      }
    });

    const { page } = await resolvePageData({
      client: app.$nacelle,
      page: pages[0]
    });

    return {
      product: products[0],
      page,
      price: products[0].variants[0].price,
      url: 'https://nostalgia-by-lance.vercel.app',
      imageurl: products[0].content.media[0].src,
      currency: 'USD',
      productid: products[0].nacelleEntryId.replace('=', '')
    };
  },
  head() {
    return buildMeta({ product: this.product });
  },

  computed: {
    sections() {
      return this.page?.fields.sections;
    },
    content() {
      const fields = this.page?.fields || {};
      const { sections, ...rest } = fields;
      return { fields: rest };
    }
  }
};
</script>

<style lang="scss" scoped></style>
