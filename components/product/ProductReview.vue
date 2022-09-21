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

    <!-- Start Rating
    <div class="yotpo bottomLine" :data-yotpo-product-id="productID"></div> -->
  </div>
</template>

<script>
export default {
  name: 'ProductReview',

  props: {
    product: {
      type: Object,
      required: true
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
