<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
import {Action, State, namespace} from 'vuex-class';

const sStore = namespace('surveys');

@Component
export default class SurveyModal extends Vue {
  @Prop() form;
  @Prop() isAdd;
  @Prop() surveys;
  @Prop() isVisible;
  @sStore.Action addSurvey;
  @sStore.Action editSurvey;
  @sStore.Action setModalVisible;
  @sStore.State isModalLoading;
  @Action setDialogMessage;

  handleOk() {
    if (this.isAdd) {
      this.addSurvey(this.form);
    } else {
      this.editSurvey(this.form);
    }
  }

  handleClose() {
    this.setModalVisible(false);
  }
}
</script>

<template lang="pug">
  b-modal(
    hide-header-close=true,
    :visible='isVisible',
    :cancel-title='$t("buttons.cancel")',
    :ok-disabled='isModalLoading',
    :ok-title='isModalLoading ? $t("buttons.sending") : isAdd ? $t("buttons.add") : $t("buttons.update")',
    :title='isAdd ? $t("surveys.add_survey") : $t("surveys.add_survey")',
    @hide='handleClose',
    @ok.prevent='handleOk',
  )
    b-form
      b-form-group(
        :label='$t("surveys.form_title")'
        :description='$t("surveys.form_title_description")'
        label-for='title',
      )
        b-form-input#title(
          type='text',
          v-model='form.title',
          maxlength="50",
          required,
        )

      b-form-group(
        :label='$t("surveys.form_slug")'
        :description='$t("surveys.form_slug_description")'
        label-for='slug',
      )
        b-form-input#slug(
          type='text',
          maxlength='50',
          v-model='form.slug',
        )

      b-form-group(
        :label='$t("surveys.form_description")'
        :description='$t("surveys.form_description_description")'
        label-for='slug',
      )
        b-form-textarea#description(
          type='text',
          v-model='form.description',
        )

      b-form-group(
        :label='$t("surveys.form_welcome_text")'
        :description='$t("surveys.form_welcome_text_description")'
        label-for='welcome_text',
      )
        b-form-textarea#welcome_text(
          type='text',
          v-model='form.welcome_text',
        )

      b-form-group(
        :label='$t("surveys.form_end_text")'
        :description='$t("surveys.form_end_text_description")'
        label-for='end_text',
      )
        b-form-textarea#end_text(
          type='text',
          v-model='form.end_text',
        )



</template>
