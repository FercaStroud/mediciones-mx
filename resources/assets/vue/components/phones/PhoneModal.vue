<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
import {Action, State, namespace} from 'vuex-class';

const pStore = namespace('phones');

@Component
export default class EmailModal extends Vue {
  @Prop() form;
  @Prop() isAdd;
  @Prop() isVisible;
  @pStore.Action addPhone;
  @pStore.Action editPhone;
  @pStore.Action setPhoneModalVisible;
  @pStore.State isPhoneModalLoading;

  @Action setDialogMessage;

  handleOk() {
    if (this.isAdd) {
      this.addPhone(this.form);
    } else {
      this.editPhone(this.form);
    }
  }

  handleClose() {
    this.setPhoneModalVisible(false);
  }
}
</script>

<template lang="pug">
  b-modal(
    hide-header-close=true,
    :visible='isVisible',
    size="xl",
    :cancel-title='$t("buttons.cancel")',
    :ok-disabled='isPhoneModalLoading',
    :ok-title='isPhoneModalLoading ? $t("buttons.sending") : isAdd ? $t("buttons.add") : $t("buttons.update")',
    :title='isAdd ? $t("phones.add_title") : $t("phones.edit_title")',
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
        b-col(md="6")
          b-form-group(
            :label='$t("phones.form_name")'
            :description='$t("phones.form_name_description")'
            label-for='name',
          )
            b-form-input#name(
              type='text',
              v-model='form.name',
              maxlength="20",
            )
        b-col(md="6")
          b-form-group(
            :label='$t("phones.form_phone")'
            :description='$t("phones.form_phone_description")'
            label-for='phone',
          )
            b-form-input#phone(
              type='text',
              v-model='form.phone',
              maxlength="15",
              required,
            )
      b-row
        b-col(md="4")
          b-form-group(
            :label='$t("phones.form_primary")',
            :description='$t("phones.form_primary_description")',
            label-for='primary',
          )
            b-form-checkbox#primary(
              name="primary",
              switch,
              v-model='form.primary',
            )

</template>
