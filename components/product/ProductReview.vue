<template>
  <div v-if="product" class="bg-white">
    Review Widget
    <div
      class="yotpo yotpo-main-widget"
      :data-product-id="productID"
      :data-price="price"
      :data-currency="currency"
      :data-name="product.content.title"
      data-url="https://nostalgia-by-lance.vercel.app/products/rosana-top"
      :data-image-url="imageURL"
    ></div>

    <!-- Start Rating
    <div class="yotpo bottomLine" :data-yotpo-product-id="productID"></div> -->
  </div>
</template>

<script>
import { formatPrice } from '~/utils/formatPrice';

export default {
  name: 'ProductReview',

  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    price() {
      console.log('product in review', this.product);
      return formatPrice({ price: this.product?.variants[0].price });
    },
    url() {
      console.log(
        'product url',
        'https://nostalgia-by-lance.vercel.app/products/' +
          this.product?.content.handle
      );
      return (
        'https://nostalgia-by-lance.vercel.app/products/' +
        this.product?.content.handle
      );
    },
    imageURL() {
      console.log(
        'this.product.content.media[0].src;',
        this.product.content.media[0].src
      );
      return this.product.content.media[0].src;
    },
    currency() {
      return 'USD';
    },
    productID() {
      return this.product.nacelleEntryId.replace('=', '');
    }
  },
  mounted() {
    const recaptchaScript = document.createElement('script');
    recaptchaScript.setAttribute(
      'src',
      '//staticw2.yotpo.com/aYi6vxBOV00VyVRIlsqsQa0nA2jAi07rWQILkcLO/widget.js'
    );
    document.head.appendChild(recaptchaScript);
  }
};
</script>
