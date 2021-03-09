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
  div()
    b-navbar(type='light' fixed="top")
      b-navbar-brand(href='#')
        img(
          style="width: 100px"
          src='/images/logo.svg',
          alt='Logo'
        )
      b-navbar-toggle(target='nav-collapse')
    survey-base
    footer(style="text-align:center")
      img.mb-5(
        style="width: 100px"
        src='/images/logo.svg',
        alt='Logo'
      )
</template>
<style lang="scss" scoped>

</style>
