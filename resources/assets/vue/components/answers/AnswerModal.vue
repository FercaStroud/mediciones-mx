<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
import {Action, State, namespace} from 'vuex-class';

const aStore = namespace('answers');
const qStore = namespace('questions');

@Component
export default class QuestionModal extends Vue {
  @Prop() form;
  @Prop() isAdd;
  @Prop() isVisible;
  @aStore.Action addAnswer;
  @aStore.Action editAnswer;
  @aStore.Action setModalVisible;
  @aStore.State isModalLoading;
  @qStore.State questions;
  @qStore.State isLoading;
  @qStore.Action loadQuestions;

  @Action setDialogMessage;

  async created() {
    await this.getQuestions(parseInt(this.$route.params.survey_id));
  }

  async getQuestions(survey_id: number): Promise<void> {
    this.loadQuestions({ survey_id });
  }

  handleOk() {
    if (this.isAdd) {
      this.addAnswer(this.form);
    } else {
      this.editAnswer(this.form);
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
    size="xl",
    :cancel-title='$t("buttons.cancel")',
    :ok-disabled='isModalLoading',
    :ok-title='isModalLoading ? $t("buttons.sending") : isAdd ? $t("buttons.add") : $t("buttons.update")',
    :title='isAdd ? $t("answers.add_answer") : $t("answers.edit_answer")',
    @hide='handleClose',
    @ok.prevent='handleOk',
  )
    p {{this.form}}
    b-form
      b-row
        b-col(cols="6")
          b-form-group(
            :label='$t("answers.form_question_id")'
            :description='$t("answers.form_question_id_description")'
            label-for='form_question_id',
          )
            b-form-input#form_question_id(
              type='text',
              v-model='form.question_id',
              required,
              readonly
            )

          b-form-group(
            :label='$t("answers.form_title")'
            :description='$t("answers.form_title_description")'
            label-for='title',
          )
            b-form-input#title(
              type='text',
              v-model='form.title',
              maxlength="140",
              required,
            )

          b-form-group(
            :label='$t("answers.form_value")'
            :description='$t("answers.form_value_description")'
            label-for='title',
          )
            b-form-input#value(
              type='text',
              v-model='form.value',
              maxlength="140",
              required,
            )

          b-form-group(
            :label='$t("answers.force_question_id")'
            :description='$t("answers.form_force_question_id_description")'
            label-for='force_question_id',
          )
            b-form-select#force_question_id(
              v-model='form.force_question_id',
              :select-size="4"
            )
              b-form-select-option(
                v-for='(question, i) in questions',
                :key='question.id',
                :value="question.id"
              ) {{ question.title }}

        b-col(cols="6")
          b-form-group(
            :label='$t("answers.form_order")'
            :description='$t("answers.form_order_description")'
            label-for='order',
          )
            b-form-input#order(
              type='number',
              min="0"
              v-model='form.order',
            )
          hr
          b-form-group(
            :label='$t("answers.form_end_survey")',
            :description='$t("answers.form_end_survey_description")',
            label-for='end_survey',
          )
            b-form-checkbox#end_survey(
              name="end_survey",
              switch,
              v-model='form.end_survey',
            )
          hr
          b-form-group(
          :label='$t("answers.form_required")'
          :description='$t("answers.form_required_description")'
          label-for='required',
          )
            b-form-checkbox#required(
              name="required",
              switch,
              v-model='form.required'
            )
          hr
          b-form-group(
            :label='$t("answers.form_image")'
            label-for='src',
            :description='$t("answers.form_image_description")'
          )
            b-form-file#src(
              type='text',
              accept="image/*",
              :browse-text='$t("strings.browse")',
              :state="Boolean(form.src)"
              v-model='form.src',
              :placeholder='$t("strings.choose_img")'
              :drop-placeholder='$t("strings.drop_img")'
            )

</template>
