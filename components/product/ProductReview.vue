<template>
  <div v-if="name" class="bg-white">
    <div
      class="yotpo yotpo-main-widget"
      :data-product-id="productid"
      :data-price="price"
      :data-currency="currency"
      :data-name="name"
      :data-url="url"
      :data-image-url="imageurl"
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
    },
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
    imageurl: {
      type: String,
      required: true
    },
    currency: {
      type: String,
      required: true
    },
    productid: {
      type: String,
      required: true
    }
  },
  mounted() {
    // const pathArray = window.location.pathname.split('/');
    // update Yotpo dynamically
    const that = this;
    if (window.yotpo) {
      window.yotpo.initialized = false;
      window.yotpo.clean();

      // there is a widgets array that the widgets are pulling data from; we need to update this
      for (let i = 0, len = window.yotpo.widgets.length; i < len; i++) {
        // console.log('refreshing yotpo', window.yotpo.widgets[i].settings.pid);
        window.yotpo.widgets[i].settings.pid = that.productid;
        window.yotpo.widgets[i].settings.main_widget_pid = that.productid;
        // console.log('new value', window.yotpo.widgets[i].settings.pid);
      }

      setTimeout(() => {
        window.yotpo.initWidgets();
      }, 500);
    } else {
      // console.log('initializing and refreshing yotpo');
      const recaptchaScript = document.createElement('script');
      recaptchaScript.setAttribute(
        'src',
        '//staticw2.yotpo.com/aYi6vxBOV00VyVRIlsqsQa0nA2jAi07rWQILkcLO/widget.js'
      );
      document.head.appendChild(recaptchaScript);
    }
  }
};
</script>
