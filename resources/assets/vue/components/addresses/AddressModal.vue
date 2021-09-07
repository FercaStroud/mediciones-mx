<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
import {Action, State, namespace} from 'vuex-class';

const aStore = namespace('addresses');

@Component
export default class AddressModal extends Vue {
  @Prop() form;
  @Prop() isAdd;
  @Prop() isVisible;
  @aStore.Action addAddress;
  @aStore.Action editAddress;
  @aStore.Action setAddressModalVisible;
  @aStore.State isAddressModalLoading;

  @Action setDialogMessage;

  handleOk() {
    if (this.isAdd) {
      this.addAddress(this.form);
    } else {
      this.editAddress(this.form);
    }
  }

  handleClose() {
    this.setAddressModalVisible(false);
  }
}
</script>

<template lang="pug">
  b-modal(
    hide-header-close=true,
    :visible='isVisible',
    size="xl",
    :cancel-title='$t("buttons.cancel")',
    :ok-disabled='isAddressModalLoading',
    :ok-title='isAddressModalLoading ? $t("buttons.sending") : isAdd ? $t("buttons.add") : $t("buttons.update")',
    :title='isAdd ? $t("addresses.add_title") : $t("addresses.edit_title")',
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
            :label='$t("addresses.form_contact_id")'
            :description='$t("addresses.form_contact_id_description")'
            label-for='contact_id',
          )
            b-form-input#contact_id(
              type='text',
              v-model='form.contact_id',
              disabled
              required,
            )
      b-row
        b-col(md="8")
          b-form-group(
            :label='$t("addresses.form_street_name")'
            :description='$t("addresses.form_street_name_description")'
            label-for='street_name',
          )
            b-form-input#street_name(
              type='text',
              v-model='form.street_name',
              maxlength="35",
              required,
            )
        b-col(md="2")
          b-form-group(
            :label='$t("addresses.form_street_number")'
            :description='$t("addresses.form_street_number_description")'
            label-for='street_number',
          )
            b-form-input#street_number(
              type='text',
              v-model='form.street_number',
              maxlength="5",
              required
            )
        b-col(md="2")
          b-form-group(
            :label='$t("addresses.form_street_number_int")'
            :description='$t("addresses.form_street_number__intdescription")'
            label-for='street_number_int',
          )
            b-form-input#street_number_int(
              type='text',
              v-model='form.street_number_int',
              maxlength="5",
            )
      b-row
        b-col(md="4")
          b-form-group(
            :label='$t("addresses.form_zipcode")'
            :description='$t("addresses.form_zipcode_description")'
            label-for='zipcode',
          )
            b-form-input#zipcode(
              type='text',
              v-model='form.zipcode',
              maxlength="10",
            )
      b-row
        b-col(md="4")
          b-form-group(
            :label='$t("addresses.form_country")'
            :description='$t("addresses.form_country_description")'
            label-for='country',
          )
            b-form-input#country(
              type='text',
              v-model='form.country',
              maxlength="35",
            )
        b-col(md="4")
          b-form-group(
            :label='$t("addresses.form_state")'
            :description='$t("addresses.form_state_description")'
            label-for='state',
          )
            b-form-input#state(
              type='text',
              v-model='form.state',
              maxlength="35",
            )
        b-col(md="4")
          b-form-group(
            :label='$t("addresses.form_city")'
            :description='$t("addresses.form_city_description")'
            label-for='city',
          )
            b-form-input#city(
              type='text',
              v-model='form.city',
              maxlength="35",
            )
      b-row
        b-col(md="12")
          b-form-group(
            :label='$t("addresses.form_other_details")'
            :description='$t("addresses.form_other_details_description")'
            label-for='other_details',
          )
            b-form-textarea#other_details(
              type='text',
              v-model='form.other_details',
              rows="3",
              max-rows="6"
            )
      b-row
        b-col(md="4")
          b-form-group(
            :label='$t("addresses.form_primary")',
            :description='$t("addresses.form_primary_description")',
            label-for='primary',
          )
            b-form-checkbox#primary(
              name="primary",
              switch,
              v-model='form.primary',
            )

</template>
