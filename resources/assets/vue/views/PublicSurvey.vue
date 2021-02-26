<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import SurveyBase from '@/components/surveys/SurveyBase.vue';

@Component(
    {
      components: {
        SurveyBase,
      }
    }
)
export default class Surveys extends Vue {
  mounted() {

  }

}
</script>

<template lang="pug">
  b-container(fluid="")
    survey-base

</template>
<style lang="scss" scoped>

</style>
