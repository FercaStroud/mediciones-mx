<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
import {Action, State, namespace} from 'vuex-class';

const eStore = namespace('emails');

@Component
export default class EmailModal extends Vue {
  @Prop() form;
  @Prop() isAdd;
  @Prop() isVisible;
  @eStore.Action addEmail;
  @eStore.Action editEmail;
  @eStore.Action setEmailModalVisible;
  @eStore.State isEmailModalLoading;

  @Action setDialogMessage;

  handleOk() {
    if (this.isAdd) {
      this.addEmail(this.form);
    } else {
      this.editEmail(this.form);
    }
  }

  handleClose() {
    this.setEmailModalVisible(false);
  }
}
</script>

<template lang="pug">
  b-modal(
    hide-header-close=true,
    :visible='isVisible',
    size="xl",
    :cancel-title='$t("buttons.cancel")',
    :ok-disabled='isEmailModalLoading',
    :ok-title='isEmailModalLoading ? $t("buttons.sending") : isAdd ? $t("buttons.add") : $t("buttons.update")',
    :title='isAdd ? $t("emails.add_title") : $t("emails.edit_title")',
    @hide='handleClose',
    @ok.prevent='handleOk',
  )
    b-form
      b-row(style="display:none")
        b-col(md="2")
          b-form-group(
            label-for='id',
          )
            b-form-input#id(
              type='text',
              v-model='form.id',
              disabled
              required,
            )
      b-row(style="display:none")
        b-col(md="2")
          b-form-group(
            label-for='contact_id',
          )
            b-form-input#contact_id(
              type='text',
              v-model='form.contact_id',
              disabled
              required,
            )
      b-row
        b-col(md="12")
          b-form-group(
            :label='$t("emails.form_email")'
            :description='$t("emails.form_email_description")'
            label-for='email',
          )
            b-form-input#email(
              type='text',
              v-model='form.email',
              maxlength="191",
              required,
            )
      b-row
        b-col(md="4")
          b-form-group(
            :label='$t("emails.form_primary")',
            :description='$t("emails.form_primary_description")',
            label-for='primary',
          )
            b-form-checkbox#primary(
              name="primary",
              switch,
              v-model='form.primary',
            )

</template>
