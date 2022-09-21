<template>
  <div v-if="name" class="bg-white">
    <div
      class="yotpo yotpo-main-widget"
      :data-product-id="productID"
      :data-price="price"
      :data-currency="currency"
      :data-name="name"
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
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: false,
      default: 0
    },
    url: {
      type: String,
      required: true
    },
    imageURL: {
      type: String,
      required: true
    },
    currency: {
      type: String,
      required: true
    },
    productID: {
      type: String,
      required: true
    }
  },
  mounted() {
    // const pathArray = window.location.pathname.split('/');
    // update Yotpo dynamically
    console.log('refreshing yotpo');

    window.yotpo.initialized = false;
    window.yotpo.clean();

    // there is a widgets array that the widgets are pulling data from; we need to update this
    for (let i = 0, len = window.yotpo.widgets.length; i < len; i++) {
      window.yotpo.widgets[i].settings.pid = this.productID;
      window.yotpo.widgets[i].settings.main_widget_pid = this.productID;
    }
    setTimeout(() => window.yotpo.initWidgets(), 500);
  }
};
</script>
