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
  .survey-container()
    .navigator-container
      div
        img(
          style="position:relative;width: 70px;left:-70px;margin-left:100%;padding:10px"
          src='/images/logo.svg',
          alt='Logo'
        )
    survey-base
    //footer(style="text-align:center")
      img.mb-5(
        style="width: 100px"
        src='/images/logo.svg',
        alt='Logo'
      )
</template>
<style lang="scss" scoped>
.survey-container{
  //background-color: white !important;
}
.navigator-container{
  position: fixed;
  z-index: 1;
  background-color: white;
  width: 100%;
}
</style>
