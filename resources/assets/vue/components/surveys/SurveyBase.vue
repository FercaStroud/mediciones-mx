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
        Preloader
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

  .container(v-if="!isLoading && survey.active")
    h1 {{survey.title}}

    b-card.mb-2()
      b-card-text
        p {{ survey.welcome_text }}
        strong {{$t('surveys.description')}}
        p {{ survey.description }}

    .questions
      b-row
        b-col(md='12' style='text-align: center' v-for='(question,key) in survey.questions' :key='key')
          b-card()
            b-card-title
              strong(style='color:darkred') *
              strong.text-primary {{question.title}}
            img(
              v-if="question.src !== null"
              style="width:100%"
              :src="'uploads/images/questions/' + question.src"
            )
            b-card-body
              b-form-group
                b-form-radio-group(
                  :placeholder="$t('surveys.select_a_cuestion')"
                  stacked
                  buttons
                  button-variant='outline-primary'
                )
                  b-form-radio(
                    style="width:100%"
                    :value="$t('surveys.select_a_cuestion_required')"
                  )
                    .full-width {{$t('surveys.select_a_cuestion_required')}}
                  b-form-radio(
                    style="width:100%"
                    v-for="(answer, key) in question.answers"
                    :key="key"
                    :value="answer.title"
                  )
                    .full-width {{answer.title}}
                    .full-width
                      img(
                        v-if="answer.src !== null"
                        style="width:100%"
                        :src="'uploads/images/answers/' + answer.src"
                      )

    b-card.mb-2()
      b-card-text
        p {{ survey.end_text }}

    pre {{survey}}}


</template>

<style scoped>

</style>
