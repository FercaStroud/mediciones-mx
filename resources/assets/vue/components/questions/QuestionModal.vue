<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
import {Action, State, namespace} from 'vuex-class';

const qStore = namespace('questions');

@Component
export default class QuestionModal extends Vue {
  @Prop() form;
  @Prop() isAdd;
  @Prop() isVisible;
  @qStore.Action addQuestion;
  @qStore.Action editQuestion;
  @qStore.Action setModalVisible;
  @qStore.State isModalLoading;
  @Action setDialogMessage;

  handleOk() {
    if (this.isAdd) {
      this.addQuestion(this.form);
    } else {
      this.editQuestion(this.form);
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
    :title='isAdd ? $t("questions.add_question") : $t("questions.edit_question")',
    @hide='handleClose',
    @ok.prevent='handleOk',
  )
    b-form
      b-form-group(
        :label='$t("questions.form_survey_id")'
        :description='$t("questions.form_survey_id_description")'
        label-for='survey_id',
      )
        b-form-input#survey_id(
          type='text',
          v-model='form.survey_id',
          required,
          readonly
        )

      b-form-group(
        :label='$t("questions.form_title")'
        :description='$t("questions.form_title_description")'
        label-for='title',
      )
        b-form-input#title(
          type='text',
          v-model='form.title',
          maxlength="140",
          required,
        )

      b-form-group(
        :label='$t("questions.form_input_type_id")'
        :description='$t("questions.form_input_type_id_description")'
        label-for='input_type_id',
      )
        b-form-select#input_type_id(
          v-model='form.input_type_id',
          :select-size="4"
        )
          b-form-select-option(
            :value="1"
          ) De seleción
          b-form-select-option(
            :value="2"
          ) Abierta

      b-form-group(
        :label='$t("questions.form_order")'
        :description='$t("questions.form_order_description")'
        label-for='order',
      )
        b-form-input#order(
          type='number',
          min="0"
          v-model='form.order',
        )

    b-form-group(
      :label='$t("questions.form_required")'
      :description='$t("questions.form_required_description")'
      label-for='required',
    )
      b-form-checkbox#required(
        name="required",
        switch,
        v-model='form.required'
      )
    hr

    b-form-group(
      :label='$t("questions.form_image")'
      label-for='src',
      :description='$t("questions.form_image_description")'
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
