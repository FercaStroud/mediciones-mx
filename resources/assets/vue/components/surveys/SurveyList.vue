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
      //this.getSurveys(parseInt(this.$route.params.id));
    })
  }

  handleEditSurvey(survey: Survey):void{
    this.setForm(survey);
    this.setModalAdd(false);
    this.setModalVisible(true);
  }

  async deleteSurveyConfirm(Survey: Survey): Promise<void> {
    if (!(await dialog('front.delete_survey_confirmation', true))) {
      return;
    }

    this.deleteSurvey(category);
  }

  async getSurveys(user_id: number): Promise<void> {
    this.loadSurveys({ user_id });
  }
}
</script>

<template lang="pug">
  div
    b-table.btable(
      style="max-height:600px"
      sort-icon-left
      striped
      responsive
      hover
      sticky-header
      no-border-collapse
      head-variant="dark"
      :busy="isLoading"
      :items="surveys"
      :fields="fields"
    )

      template(v-slot:table-busy)
        div.text-center.text-danger
          b-spinner.align-middle

      template(v-slot:head(name)="data")
        span {{$t("categories.name")}}
      template(v-slot:head(description)="data")
        span {{$t("categories.description")}}
      template(v-slot:head(image_src)="data")
        span {{$t("categories.image_src")}}
      template(v-slot:head(created_at)="data")
        span {{$t("strings.created_at")}}
      template(v-slot:head(updated_at)="data")
        span {{$t("strings.updated_at")}}
      template(v-slot:head(actions)="data")
        span {{$t("strings.actions")}}

      template(v-slot:cell(image_src)="data")
        img(
          v-if="data.item.image_src"
          :src='"/uploads/images/categories/" + data.item.image_src'
          style="width:108px;height:20px"
        )

      template(v-slot:cell(actions)="data")
        b-button.btn.table-btn.mb-2(
          size="sm"
          @click="handleEditCategory(data.item)"
          :title="$t('strings.edit')"
        )
          b-icon(
            icon="pencil"
            style="color: #fff;"
          )
        b-button.btn-danger.table-btn.mb-2(
          :title="$t('strings.delete')"
          @click="deleteCategoryConfirm(data.item)"
          size="sm"
        )
          b-icon(
            icon="trash-fill"
            style="color: #fff"
          )


      template( v-slot:cell(index)="data")
        span {{ data.index + 1 }}

</template>

<style scoped>

</style>
