<script lang="ts">
import { Component, Vue, } from 'vue-property-decorator';
import { Action, State, namespace } from 'vuex-class';

import dialog from '@/utils/dialog';

const aStore = namespace('answers');

@Component(
    {
      components: {
      },
    }
)

export default class AnswerList extends Vue {
  @aStore.State fields;
  @aStore.State answers;
  @aStore.State isLoading;
  @aStore.State isModalAdd;
  @aStore.State form;
  @aStore.Action deleteAnswer;
  @aStore.Action loadAnswers;
  @aStore.Action setModalVisible;
  @aStore.Action setModalAdd;
  @aStore.Action setForm;

  mounted() {
    this.$nextTick(() => {
      this.getAnswers(parseInt(this.$route.params.question_id));
    })
  }

  get actualUser() {
    return this.$auth.user();
  }

  handleEditAnswer(answer: Answer):void{
    this.setForm(answer);
    this.setModalAdd(false);
    this.setModalVisible(true);
  }

  async deleteAnswerConfirm(answer: Answer): Promise<void> {
    if (!(await dialog('front.delete_answer_confirmation', true))) {
      return;
    }

    this.deleteAnswer(answer);
  }

  async getAnswers(question_id: number): Promise<void> {
    this.loadAnswers({ question_id });
  }
}
</script>

<template lang="pug">
  div
    b-button.btn.table-btn.mr-2(
      style="margin-bottom: 5px"
      @click="getAnswers(parseInt($route.params.question_id))"
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
      :items="answers"
      :fields="fields"
    )

      template(#table-busy)
        div.text-center.text-danger
          b-spinner.align-middle

      template(v-slot:head(id)="data")
        span {{$t("answers.id")}}
      template(v-slot:head(order)="data")
        span {{$t("answers.order")}}
      template(v-slot:head(value)="data")
        span {{$t("answers.value")}}
      template(v-slot:head(src)="data")
        span {{$t("answers.src")}}
      template(v-slot:head(title)="data")
        span {{$t("answers.title")}}
      template(v-slot:head(end_survey)="data")
        span {{$t("answers.end_survey")}}
      template(v-slot:head(force_question_id)="data")
        span {{$t("answers.force_question_id")}}
      template(v-slot:head(created_at)="data")
        .text-nowrap {{$t("strings.created_at")}}
      template(v-slot:head(updated_at)="data")
        .text-nowrap {{$t("strings.updated_at")}}

      template(v-slot:head(actions)="data")
        span {{$t("strings.actions")}}

      template(v-slot:cell(end_survey)="data")
        b-button(v-if="data.item.end_survey === 1" variant="outline-success" disabled ) {{ $t('answers.end_survey_true') }}
        b-button(v-else disabled variant="outline-secondary") {{ $t('answers.end_survey_false') }}

      template(v-slot:cell(created_at)="data")
        span {{ data.item.created_at | moment("dddd D, MMMM YYYY") }}
      template(v-slot:cell(updated_at)="data")
        span {{ data.item.updated_at | moment("dddd D, MMMM YYYY") }}
      template(v-slot:cell(actions)="data")
        b-button.btn.table-btn.mb-2(
          size="sm"
          style="margin-right: 5px"
          @click="handleEditAnswer(data.item)"
          :title="$t('strings.edit')"
        )
          b-icon(
            icon="pencil"
            style="color: #fff;"
          )
          | {{$t('strings.edit')}}

        b-button.btn-danger.table-btn.mb-2(
          :title="$t('strings.delete')"
          @click="deleteAnswerConfirm(data.item)"
          size="sm"
        )
          b-icon(
            icon="trash-fill"
            style="color: #fff"
          )
          | {{$t('strings.delete')}}

      template(v-slot:cell(src)="data")
        img(
          v-if="data.item.src"
          :src='"/uploads/images/answers/" + data.item.src'
          style="width:50px;height:50px"
        )

      template(v-slot:cell(index)="data")
        span {{ data.index + 1 }}



</template>

<style scoped>

</style>
