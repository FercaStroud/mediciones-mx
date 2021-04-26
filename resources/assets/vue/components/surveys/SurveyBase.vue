<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
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
        };
      }
    }
)

export default class SurveyBase extends Vue {
  @sStore.State isLoading;
  @sStore.State survey;
  @sStore.Action loadSurveyBySlug;
  @sStore.Action sendPublicSurvey;

  welcomeTextVisible: boolean;
  endTextVisible: boolean;
  startSurveyButtonVisible: boolean;
  sendSurveyButtonVisible: boolean;

  mounted() {
    this.$nextTick(() => {
      this.getSurveyBySlug(this.$route.params.slug);
      this.welcomeTextVisible = true;
      this.endTextVisible = false;
      this.startSurveyButtonVisible = true;
      this.sendSurveyButtonVisible = false;

      if(this.getCookie("successForm")){
        this.welcomeTextVisible = false;
        this.endTextVisible = true;
        this.startSurveyButtonVisible = false;
        this.sendSurveyButtonVisible = false;
      }

    });
  }

  setCookie(name,value,days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }

  getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  eraseCookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  async getSurveyBySlug(slug: string): Promise<void> {
    this.loadSurveyBySlug({slug});
  }

  sortArrayByKey(array, key) {
    return (array).sort(function (a, b) {
      let x = a[key];
      let y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  hideAllQuestions() {
    (this.survey.questions).forEach(function (question, key) {
      question.visible = false;
    });
  }

  startSurvey(): void {
    this.survey.questions[0].visible = true;
    this.startSurveyButtonVisible = false;
  }

  sendSurvey(): void {
    this.sendPublicSurvey(this.survey.questions);
    dialog('¡Gracias por participar!', false)
    this.sendSurveyButtonVisible = false;
    this.setCookie("successForm", true, 30);
  }

  forceVisibleQuestionById(questionId): void {
    this.hideAllQuestions();
    (this.survey.questions).forEach(function (question, key) {
      if (question.id === questionId) {
        question.visible = true;
      }
    });
  }

  showNextQuestion(currentQuestion): void {
    let foo = false;
    let endSurvey = true;
    this.hideAllQuestions();
    (this.survey.questions).forEach(function (question, key) {

      if (foo) {
        question.visible = true;
        foo = false;
      } else if (question === currentQuestion) {
        foo = true;
      }

      if(question.visible === true){
        endSurvey = false;
      }

    });

    if (endSurvey) {
      this.sendSurveyButtonVisible = true;
      this.endTextVisible = true;
      this.welcomeTextVisible = false;
    }
  }

  processingAnswer(question): void {
    let vm = this;
    (question.answers).forEach(function (answer, key) {
      if (question.vModel === answer.value) {
        if (answer.end_survey === 1) {
          vm.sendSurveyButtonVisible = true;
          vm.endTextVisible = true;
          vm.welcomeTextVisible = false;
          vm.hideAllQuestions();
        } else if (answer.force_question_id !== null) {
          vm.forceVisibleQuestionById(answer.force_question_id);
        } else {
          vm.showNextQuestion(question);
        }
      }
    });
  }

}
</script>

<template lang="pug">
  div
    Preloader(:is-loading="isLoading")
    MessageFullPage(v-if="!survey.active && !isLoading" :message="$t('surveys.survey_disabled')")

    .app-navigator
      span.text-primary.app-title {{survey.title}}

    .survey-container.container-fluid(v-if="!isLoading && survey.active")
      b-row(v-show="welcomeTextVisible")
        b-col
          p(style="color: black") {{ survey.welcome_text }}
          p(style="color: black")  {{ survey.description }}
      b-row
        b-col
          b-button(
            variant="outline-primary"
            block
            @click="startSurvey"
            v-show="startSurveyButtonVisible"
          ) Comenzar encuesta
      //QUESTIONS CONTAINER
      b-row(
        v-for="(question, key) in survey.questions"
        :key="key"
        v-show="question.visible"
      )
        b-col.mt-1(md="6" sm="12")
          img(
            v-if="question.src !== null"
            style="width:100%"
            :src='"/uploads/images/questions/" + question.src'
            :alt="question.title"
          )
        b-col.mt-1(md="6" sm="12")
          b-row
            b-col
              strong.text-danger(v-if="question.required") *
              strong.text-primary.question-title(
                style="width: 100%; text-align:center;"
              ) {{question.title}}
            b-row.mt-2
              b-col()
                b-form-group.container
                  b-form-radio-group(
                    placeholder="Selecciona una respuesta."
                    v-model="question.vModel"
                    buttons
                    button-variant="outline-primary"
                    size="lg"
                    :required="question.required"
                    @change="$nextTick(function (){processingAnswer(question)})"
                  )
                    b-form-radio(
                      style=""
                      value="Selecciona una respuesta."
                    )
                      div Selecciona una respuesta.
                    b-form-radio(
                      v-for="(answer, key) in question.answers"
                      :key="key"
                      :value="answer.value"
                    )
                      div {{answer.title}}
                      div
                        img(
                          v-if="answer.src !== null"
                          style="width:100%"
                          :src="'uploads/images/answers/' + answer.src"
                        )

      b-row(v-show="endTextVisible")
        b-col
          p(style="color: black")  {{ survey.end_text }}

      b-row(v-show="sendSurveyButtonVisible")
        b-col
          b-button(
            variant="outline-primary"
            block
            @click="sendSurvey"
            v-show="sendSurveyButtonVisible"
          ) Enviar encuesta
</template>

<style scoped lang="scss">
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
  top: 100px;
  position: relative;
}

.question-title {
  font-size: 1.2em;
}

</style>
<style>
label {
  width: 100%;
}
</style>
