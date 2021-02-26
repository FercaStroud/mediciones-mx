<script lang="ts">
import { Component, Vue, } from 'vue-property-decorator';
import { Action, State, namespace } from 'vuex-class';

import dialog from '@/utils/dialog';

const sStore = namespace('surveys');

@Component(
    {
      components: {
      },
    }
)

export default class SurveyBase extends Vue {
  @sStore.State isLoading;
  @sStore.State survey;
  @sStore.Action loadSurveyBySlug;

  mounted() {
    this.$nextTick(() => {
      this.getSurveyBySlug(this.$route.params.slug);
    })
  }

  async getSurveyBySlug(slug: string): Promise<void> {
    this.loadSurveyBySlug({ slug });
  }
}
</script>

<template lang="pug">
  div
   pre {{survey}}



</template>

<style scoped>

</style>
