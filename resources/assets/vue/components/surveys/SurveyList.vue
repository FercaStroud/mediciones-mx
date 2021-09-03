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

export default class SurveyList extends Vue {
  @sStore.State fields;
  @sStore.State surveys;
  @sStore.State isLoading;
  @sStore.State isModalAdd;
  @sStore.State form;
  @sStore.Action deleteSurvey;
  @sStore.Action loadSurveys;
  @sStore.Action setModalVisible;
  @sStore.Action setModalAdd;
  @sStore.Action setForm;

  mounted() {
    this.$nextTick(() => {
      this.getSurveys(parseInt(this.actualUser.id));
    })
  }

  get actualUser() {
    return this.$auth.user();
  }

  handleEditSurvey(survey: Survey):void{
    this.setForm(survey);
    this.setModalAdd(false);
    this.setModalVisible(true);
  }

  toQuestionsPage(survey_id: number): void{
    this.$router.push({path: '/questions/survey/' + survey_id});
  }

  async deleteSurveyConfirm(survey: Survey): Promise<void> {
    if (!(await dialog('front.delete_survey_confirmation', true))) {
      return;
    }

    this.deleteSurvey(survey);
  }

  async getSurveys(user_id: number): Promise<void> {
    this.loadSurveys({ user_id });
  }
}
</script>

<template lang="pug">
  div
    b-button.btn.table-btn.mr-2(
      style="margin-bottom: 5px"
      @click="getSurveys(parseInt(actualUser.id))"
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
      :items="surveys"
      :fields="fields"
    )

      template(#table-busy)
        div.text-center.text-danger
          b-spinner.align-middle

      template(v-slot:head(title)="data")
        span {{$t("surveys.title_survey")}}
      template(v-slot:head(slug)="data")
        span {{$t("surveys.slug")}}
      template(v-slot:head(description)="data")
        span {{$t("surveys.description")}}
      template(v-slot:head(welcome_text)="data")
        span {{$t("surveys.welcome_text")}}
      template(v-slot:head(end_text)="data")
        span {{$t("surveys.end_text")}}
      template(v-slot:head(questions)="data")
        span {{$t("surveys.questions")}}
      template(v-slot:head(active)="data")
        span {{$t("surveys.active")}}
      //template(v-slot:head(start_at)="data")
        span {{$t("strings.start_at")}}
      //template(v-slot:head(ends_at)="data")
        span {{$t("strings.ends_at")}}
      template(v-slot:head(created_at)="data")
        span {{$t("strings.created_at")}}
      template(v-slot:head(updated_at)="data")
        span {{$t("strings.updated_at")}}
      template(v-slot:head(actions)="data")
        span {{$t("strings.actions")}}

      template(v-slot:cell(active)="data")
        b-button(v-if="data.item.active === 1" variant="outline-success" disabled ) {{ $t('surveys.active_true') }}
        b-button(v-else disabled variant="outline-secondary") {{ $t('surveys.active_false') }}
      template(v-slot:cell(questions)="data")
        b-button.btn.table-btn.mr-2(
          style="margin-bottom: 5px"
          @click="toQuestionsPage(data.item.id)"
        ) {{ $t('surveys.view_questions') }}

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
          @click="handleEditSurvey(data.item)"
          :title="$t('strings.edit')"
        )
          b-icon(
            icon="pencil"
            style="color: #fff;"
          )
          | {{$t('strings.edit')}}

        b-button.btn-danger.table-btn.mb-2(
          :title="$t('strings.delete')"
          @click="deleteSurveyConfirm(data.item)"
          size="sm"
        )
          b-icon(
            icon="trash-fill"
            style="color: #fff"
          )
          | {{$t('strings.delete')}}

      template(v-slot:cell(index)="data")
        span {{ data.index + 1 }}



</template>

<style scoped>

</style>
