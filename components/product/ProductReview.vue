<template>
  <div v-if="product" class="bg-white">
    <div
      class="yotpo yotpo-main-widget"
      :data-product-id="productID"
      :data-price="price"
      :data-currency="currency"
      :data-name="product.content.title"
      :data-url="url"
      :data-image-url="imageURL"
    ></div>
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
      return this.product?.handle;
    },
    imageURL() {
      return this.product.variants[0].content.featuredMedia.src;
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
  // metaInfo: {
  //   script: [
  //     {
  //       src: '(function e(){console.log("Hello Review");var e=document.createElement("script");e.type="text/javascript",e.async=true,e.src="//staticw2.yotpo.com/aYi6vxBOV00VyVRIlsqsQa0nA2jAi07rWQILkcLO/widget.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)})();',
  //       async: true,
  //       defer: true
  //     }
  //   ]
  // }
};
</script>
