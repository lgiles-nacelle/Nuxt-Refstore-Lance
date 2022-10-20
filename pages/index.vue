<template>
  <div class="bg-white">
    <site-section
      v-for="section in sections"
      :key="section._key"
      :content="section"
    />
  </div>
</template>

<script>
import { CONTENT_PAGE_QUERY } from '~/queries/contentPage';
import { buildMeta } from '~/utils/buildMeta';
import { resolvePageData } from '~/utils/resolvers';
import SiteSection from '~/components/section/Section.vue';

export default {
  name: 'HomePage',
  components: { SiteSection },
  async asyncData({ app }) {
    const { pages } = await app.$nacelle.query({
      query: CONTENT_PAGE_QUERY,
      variables: { handle: 'page-fallpage' }
    });
    const { page } = await resolvePageData({
      client: app.$nacelle,
      page: pages[0]
    });
    return {
      page
    };
  },
  head() {
    return buildMeta({ route: this.$route });
  },
  computed: {
    sections() {
      return this.page?.fields.sections;
    }
  },
  mounted() {
    // const pathArray = window.location.pathname.split('/');
    console.log('initializing yotpo');
    const recaptchaScript = document.createElement('script');
    recaptchaScript.setAttribute(
      'src',
      '//staticw2.yotpo.com/aYi6vxBOV00VyVRIlsqsQa0nA2jAi07rWQILkcLO/widget.js'
    );
    document.head.appendChild(recaptchaScript);

    setTimeout(() => {
      if (window.yotpo) {
        window.yotpo.initWidgets();
      }
    }, 500);
  }
};
</script>

<style lang="scss" scoped></style>
