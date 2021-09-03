<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
import {Action, State, namespace} from 'vuex-class';

const cStore = namespace('contacts');

@Component
export default class QuestionModal extends Vue {
  @Prop() form;
  @Prop() isAdd;
  @Prop() isVisible;
  @cStore.Action addContact;
  @cStore.Action editContact;
  @cStore.Action setModalVisible;
  @cStore.State isModalLoading;

  @Action setDialogMessage;

  handleOk() {
    if (this.isAdd) {
      this.addContact(this.form);
    } else {
      this.editContact(this.form);
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
    :title='isAdd ? $t("contacts.add_contact") : $t("contacts.edit_contact")',
    @hide='handleClose',
    @ok.prevent='handleOk',
  )
    b-form
      b-row
        b-col(md="4")
          b-form-group(
            :label='$t("contacts.form_first_name")'
            :description='$t("contacts.form_first_name_description")'
            label-for='first_name',
          )
            b-form-input#first_name(
              type='text',
              v-model='form.firstName',
              maxlength="30",
              required,
            )
        b-col(md="4")
          b-form-group(
            :label='$t("contacts.form_last_name")'
            :description='$t("contacts.form_last_name_description")'
            label-for='last_name',
          )
            b-form-input#last_name(
              type='text',
              v-model='form.lastName',
              maxlength="15",
              required,
            )
        b-col(md="4")
          b-form-group(
            :label='$t("contacts.form_second_last_name")'
            :description='$t("contacts.form_second_last_name_description")'
            label-for='second_last_name',
          )
            b-form-input#second_last_name(
              type='text',
              v-model='form.secondLastName',
              maxlength="15",
            )

</template>
