<script lang="ts">
import { Component, Vue, } from 'vue-property-decorator';
import { Action, State, namespace } from 'vuex-class';

import dialog from '@/utils/dialog';
import Preloader from "@/components/front/Preloader.vue";
import MessageFullPage from "@/components/front/MessageFullPage.vue";

const sStore = namespace('surveys');

@Component<SurveyBase>(
    {
      components: {
        MessageFullPage,
        Preloader,
      },
      metaInfo() {
        return {
          title: this.survey.title,
          meta: [
            { charset: 'utf-8' },
            { name: 'description', content: this.survey.description },
            { name: 'copyright', content: 'Mediciones MX' },
          ],
        }
      }
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
  Preloader(:is-loading="isLoading")
  MessageFullPage(v-if="!survey.active && !isLoading" :message="$t('surveys.survey_disabled')")
  pre {{survey}}}

  //swiper(
  //  :slides-per-view="3"
  //  :space-between="50"
  //)
  //  swiper-slide slide1
  //  swiper-slide slide2
  //  swiper-slide slide3
  //.app-navigator
  //  span.text-primary.app-title {{survey.title}}
  //.container(v-if="!isLoading && survey.active" style="padding-top:110px;")
  //  .mb-2()
  //    p {{ survey.welcome_text }}
  //    strong {{$t('surveys.description')}}
  //    p {{ survey.description }}
  //    hr
  //
  //  .questions
  //    b-row
  //      b-col(md='12' style='text-align: center' v-for='(question,key) in survey.questions' :key='key')
  //        b-card()
  //          b-card-title
  //            strong(style='color:darkred') *
  //            strong.text-primary {{question.title}}
  //          img(
  //            v-if="question.src !== null"
  //            style="width:100%"
  //            :src="'uploads/images/questions/' + question.src"
  //          )
  //          b-card-body
  //            b-form-group
  //              b-form-radio-group(
  //                :placeholder="$t('surveys.select_a_cuestion')"
  //                stacked
  //                buttons
  //                button-variant='outline-primary'
  //              )
  //                b-form-radio(
  //                  style="width:100%"
  //                  :value="$t('surveys.select_a_cuestion_required')"
  //                )
  //                  .full-width {{$t('surveys.select_a_cuestion_required')}}
  //                b-form-radio(
  //                  style="width:100%"
  //                  v-for="(answer, key) in question.answers"
  //                  :key="key"
  //                  :value="answer.title"
  //                )
  //                  .full-width {{answer.title}}
  //                  .full-width
  //                    img(
  //                      v-if="answer.src !== null"
  //                      style="width:100%"
  //                      :src="'uploads/images/answers/' + answer.src"
  //                    )
  //
  //  .mt-2()
  //    p {{ survey.end_text }}
  //    div(style="height:80px")
  //.app-bottom-navigator.p-2
  //  b-button(
  //    variant="primary"
  //    block
  //  ) Next
</template>

<style scoped lang="scss">
.app-bottom-navigator{
  background-color: white;
  position: fixed;
  z-index: 1;
  width: 100%;
  bottom: 0;
}
.app-navigator{
  background-color: white;
  position: fixed;
  margin-top: 49px;
  z-index: 1;
  width: 100%;
  height: 40px;
  //box-shadow: 0px -5px 16px #888888

}
.app-title{
  padding: 10px;
  font-size: 1.4em;

}
</style>
