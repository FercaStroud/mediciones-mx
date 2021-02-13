<script lang="ts">
import { Component, Vue, } from 'vue-property-decorator';
import { Action, State, namespace } from 'vuex-class';

import dialog from '@/utils/dialog';

const qStore = namespace('questions');

@Component(
    {
      components: {
      },
    }
)

export default class QuestionList extends Vue {
  @qStore.State fields;
  @qStore.State questions;
  @qStore.State isLoading;
  @qStore.State isModalAdd;
  @qStore.State form;
  @qStore.Action deleteQuestion;
  @qStore.Action loadQuestions;
  @qStore.Action setModalVisible;
  @qStore.Action setModalAdd;
  @qStore.Action setForm;

  mounted() {
    this.$nextTick(() => {
      this.getQuestions(parseInt(this.$route.params.survey_id));
    })
  }

  get actualUser() {
    return this.$auth.user();
  }

  handleEditQuestion(question: Question):void{
    this.setForm(question);
    this.setModalAdd(false);
    this.setModalVisible(true);
  }

  toAnswersPage(question_id: number): void{
    this.$router.push({path: '/answers/' + question_id});
  }

  async deleteQuestionConfirm(question: Question): Promise<void> {
    if (!(await dialog('front.delete_question_confirmation', true))) {
      return;
    }

    this.deleteQuestion(question);
  }

  async getQuestions(survey_id: number): Promise<void> {
    this.loadQuestions({ survey_id });
  }
}
</script>

<template lang="pug">
  div
    b-button.btn.table-btn.mr-2(
      style="margin-bottom: 5px"
      @click="getQuestions(parseInt($route.params.survey_id))"
    ) {{ $t('strings.update_table') }}

    b-table.btable(
      style="max-height: max-content;"
      striped
      hover
      responsive
      sticky-header
      no-border-collapse
      outlined
      head-variant="dark"
      :busy="isLoading"
      :items="questions"
      :fields="fields"
    )

      template(#table-busy)
        div.text-center.text-danger
          b-spinner.align-middle

      template(v-slot:head(src)="data")
        span {{$t("questions.src")}}
      template(v-slot:head(order)="data")
        span {{$t("questions.order")}}
      template(v-slot:head(input_type_text)="data")
        span {{$t("questions.input_type_text")}}
      template(v-slot:head(title)="data")
        span {{$t("questions.title")}}
      template(v-slot:head(created_at)="data")
        span {{$t("strings.created_at")}}
      template(v-slot:head(updated_at)="data")
        span {{$t("strings.updated_at")}}
      template(v-slot:head(actions)="data")
        span {{$t("strings.actions")}}

      template(v-slot:cell(answers)="data")
        b-button.btn.table-btn.mr-2(
          style="margin-bottom: 5px"
          @click="toAnswersPage(data.item.id)"
        ) {{ $t('questions.view_answers') }}

      template(v-slot:cell(created_at)="data")
        span {{ data.item.created_at | moment("dddd D, MMMM YYYY") }}
      template(v-slot:cell(updated_at)="data")
        span {{ data.item.updated_at | moment("dddd D, MMMM YYYY") }}
      template(v-slot:cell(actions)="data")
        b-button.btn.table-btn.mr-2(
          style="margin-bottom: 5px"
        ) {{ $t('strings.show_details') }}

        b-button.btn.table-btn.mb-2(
          size="sm"
          style="margin-right: 5px"
          @click="handleEditQuestion(data.item)"
          :title="$t('strings.edit')"
        )
          b-icon(
            icon="pencil"
            style="color: #fff;"
          )

        b-button.btn-danger.table-btn.mb-2(
          :title="$t('strings.delete')"
          @click="deleteQuestionConfirm(data.item)"
          size="sm"
        )
          b-icon(
            icon="trash-fill"
            style="color: #fff"
          )

      template(v-slot:cell(index)="data")
        span {{ data.index + 1 }}



</template>

<style scoped>

</style>
