<script lang="ts">
import {Component, Vue,} from 'vue-property-decorator';
import {Action, State, namespace} from 'vuex-class';

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
            {charset: 'utf-8'},
            {name: 'description', content: this.survey.description},
            {name: 'copyright', content: 'Mediciones MX'},
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
    this.loadSurveyBySlug({slug});
  }

  prev(): void {
    this.$refs.carousel.prev()
  }
  next(): void {
    this.$refs.carousel.next()
  }
}
</script>

<template lang="pug">
  div
    Preloader(:is-loading="isLoading")
    MessageFullPage(v-if="!survey.active && !isLoading" :message="$t('surveys.survey_disabled')")
    //pre {{survey}}}

    .app-navigator
      span.text-primary.app-title {{survey.title}}

    .survey-container(v-if="!isLoading && survey.active")
      b-carousel(
        ref="carousel"
        no-wrap
        no-touch
        :indicators='false'
        :interval="0"
      )
        b-carousel-slide
          template(v-slot:img)
            div(style="height:calc(100vh - 60px); background-color:transparent")
          template(v-slot=caption)
            .container
              span.text-primary.question-title {{ survey.welcome_text }}
          template(v-slot=text)
            .container
              p(style="color: black")  {{ survey.description }}


        b-carousel-slide(
          v-for="(question, key) in survey.questions"
          :key="key"
        )
          template(v-slot=caption)
            .container-fluid
              b-row
                b-col.mt-1(md="6" sm="12")
                  img(
                    style="width:100%"
                    :src='"/uploads/images/questions/" + question.src'
                    :alt="question.title"
                  )
                b-col.mt-1(md="6" sm="12")
                  b-row
                    .container
                      strong.text-danger(v-if="question.required") *
                      strong.text-primary.question-title(
                        style="width: 100%; text-align:center;"
                      ) {{question.title}}
                  b-row.mt-2
                    b-col()
                      b-form-group
                        b-form-radio-group(
                          placeholder="Selecciona una respuesta."
                          v-model="question.vModel"
                          buttons
                          button-variant="outline-primary"
                          size="lg"
                          :required="question.required"
                        )
                          b-form-radio(
                           style=""
                           value="Selecciona una respuesta."
                          )
                            div Selecciona una respuesta.
                          b-form-radio(
                            v-for="(answer, key) in question.answers"
                            :key="key"
                            :value="answer.title"
                          )
                            div {{answer.title}}
                            div
                              img(
                                v-if="answer.src !== null"
                                style="width:100%"
                                :src="'uploads/images/answers/' + answer.src"
                              )
                  b-row(style="height:200px")
          template(v-slot:img)
            div(style="height:calc(100vh); background-color:transparent")


        b-carousel-slide
          template(v-slot:img)
            div(style="height:calc(100vh - 60px); background-color:transparent")
          template(v-slot=caption)
            .container
              span.text-primary.question-title {{$t('surveys.survey_end_text')}}
          template(v-slot=text)
            .container
              p(style="color: black")  {{ survey.end_text }}

    .app-bottom-navigator.p-2(v-if="!isLoading && survey.active")
      b-button(
        variant="primary"
        block
        @click="prev"
      ) Anterior
      b-button(
        variant="primary"
        block
        @click="next"
      ) Siguiente
</template>

<style scoped lang="scss">
.app-bottom-navigator {
  background-color: white;
  position: fixed;
  z-index: 9999;
  width: 100%;
  bottom: 0;
}

.app-navigator {
  background-color: white;
  position: fixed;
  margin-top: 49px;
  z-index: 1;
  width: 100%;
  height: 40px;
}

.app-title {
  padding: 10px;
  font-size: 1.4em;

}

.survey-container {
  top: 90px;
}

.question-title {
  font-size: 1.2em;
}

</style>
<style>
.carousel-caption {
  bottom: inherit !important;
  left: 0 !important;
  right: 0 !important;
  top: 90px !important;
  overflow: auto;
  height: 100vh;
}
label{
  width: 100%;
}
</style>