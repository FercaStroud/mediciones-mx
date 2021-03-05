<script lang="ts">
import {Component, Vue, Emit} from 'vue-property-decorator';
import {Action, namespace} from 'vuex-class';
import SurveyList from '@/components/surveys/SurveyList.vue';
import surveyModal from '@/components/surveys/SurveyModal.vue';

const sStore = namespace('surveys');

@Component(
    {
      components: {
        surveyModal,
        SurveyList
      }
    }
)
export default class Surveys extends Vue {
  @Action setBackUrl;
  @Action setMenu;
  @sStore.Action setModalVisible;
  @sStore.Action setForm;
  @sStore.Action setModalAdd;
  @sStore.State isModalVisible;
  @sStore.State isModalAdd;
  @sStore.State form;

  survey: Partial<Survey> = {};

  mounted() {
    this.setBackUrl('/dashboard');
    this.setMenu(
        [
          {
            text: 'surveys.add_survey',
            key: 1,
            handler: this.addSurvey
          },
        ]
    );
  }
  addSurvey(): void {
    this.setForm(this.survey);
    this.setModalAdd(true);
    this.setModalVisible(true);
  }
}
</script>

<template lang="pug">
  b-container(fluid="")
    b-row
      b-col
        h2 {{ $t('surveys.title') }}
        SurveyList

    survey-modal(
      ref='survey_modal',
      :form='form',
      :is-add='isModalAdd',
      :is-visible='isModalVisible',
    )

</template>
<style lang="scss" scoped>

</style>
