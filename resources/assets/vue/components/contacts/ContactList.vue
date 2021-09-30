<script lang="ts">
import {Component, Vue,} from 'vue-property-decorator';
import {Action, State, namespace} from 'vuex-class';

import dialog from '@/utils/dialog';

import AddressModal from '@/components/addresses/AddressModal.vue';
import EmailModal from '@/components/emails/EmailModal.vue';
import PhoneModal from '@/components/phones/PhoneModal.vue';

const cStore = namespace('contacts');
const aStore = namespace('addresses');
const eStore = namespace('emails');
const pStore = namespace('phones');

@Component(
  {
    components: {
      AddressModal,
      EmailModal,
      PhoneModal,
    },
  }
)

export default class ContactList extends Vue {
  @cStore.State fields;
  @cStore.State contacts;
  @cStore.State isLoading;
  @cStore.State isModalAdd;
  @cStore.State form;
  @cStore.Action deleteContact;
  @cStore.Action loadContacts;
  @cStore.Action setModalVisible;
  @cStore.Action setModalAdd;
  @cStore.Action setForm;

  address: Partial<Address> = {};
  @aStore.Action setAddressModalVisible;
  @aStore.Action setAddressForm;
  @aStore.Action setAddressModalAdd;
  @aStore.Action deleteAddress;
  @aStore.State isAddressModalVisible;
  @aStore.State isAddressModalAdd;
  @aStore.State addressForm;

  email: Partial<Email> = {};
  @eStore.Action setEmailModalVisible;
  @eStore.Action setEmailForm;
  @eStore.Action setEmailModalAdd;
  @eStore.Action deleteEmail;
  @eStore.State isEmailModalVisible;
  @eStore.State isEmailModalAdd;
  @eStore.State emailForm;

  phone: Partial<Phone> = {};
  @pStore.Action setPhoneModalVisible;
  @pStore.Action setPhoneForm;
  @pStore.Action setPhoneModalAdd;
  @pStore.Action deletePhone;
  @pStore.State isPhoneModalVisible;
  @pStore.State isPhoneModalAdd;
  @pStore.State phoneForm;

  mounted() {
    this.$nextTick(() => {
      this.getContacts();
    });
  }

  get actualUser() {
    return this.$auth.user();
  }

  handleEditContact(contact: Contact): void {
    this.setForm(contact);
    this.setModalAdd(false);
    this.setModalVisible(true);
  }

  async deleteContactConfirm(contact: Contact): Promise<void> {
    if (!(await dialog('front.delete_contact_confirmation', true))) {
      return;
    }

    this.deleteContact(contact);
  }

  async getContacts(): Promise<void> {
    this.loadContacts();
  }

  addAddress(contact): void {
    this.address.contact_id = contact.id;
    this.setAddressForm(this.address);
    this.setAddressModalAdd(true);
    this.setAddressModalVisible(true);
  }

  editAddress(address: Address): void {
    address.primary = Boolean(address.primary);
    this.setAddressForm(address);
    this.setAddressModalAdd(false);
    this.setAddressModalVisible(true);
  }

  async deleteAddressConfirm(address: Address): Promise<void> {
    if (!(await dialog('front.delete_address_confirmation', true))) {
      return;
    }

    this.deleteAddress(address);
  }

  addEmail(email): void {
    this.email.contact_id = email.id;
    this.setEmailForm(this.email);
    this.setEmailModalAdd(true);
    this.setEmailModalVisible(true);
  }

  editEmail(email: Email): void {
    email.primary = Boolean(email.primary);
    this.setEmailForm(email);
    this.setEmailModalAdd(false);
    this.setEmailModalVisible(true);
  }

  async deleteEmailConfirm(email: Email): Promise<void> {
    if (!(await dialog('front.delete_email_confirmation', true))) {
      return;
    }

    this.deleteEmail(email);
  }

  addPhone(phone): void {
    this.phone.contact_id = phone.id;
    this.setPhoneForm(this.phone);
    this.setPhoneModalAdd(true);
    this.setPhoneModalVisible(true);
  }

  editPhone(phone: Phone): void {
    phone.primary = Boolean(phone.primary);
    this.setPhoneForm(phone);
    this.setPhoneModalAdd(false);
    this.setPhoneModalVisible(true);
  }

  async deletePhoneConfirm(phone: Phone): Promise<void> {
    if (!(await dialog('front.delete_phone_confirmation', true))) {
      return;
    }

    this.deletePhone(phone);
  }
}
</script>

<template lang="pug">
  div
    b-button.btn.table-btn.mr-2(
      style="margin-bottom: 5px"
      @click="getContacts()"
    ) {{ $t('strings.update_table') }}

    b-table.btable(
      style="max-height: max-content;"
      striped
      responsive
      sticky-header
      no-border-collapse
      outlined
      head-variant="dark"
      :busy="isLoading"
      :items="contacts"
      :fields="fields"
      select-mode="single"
    )

      template(#table-busy)
        div.text-center.text-danger
          b-spinner.align-middle

      template(v-slot:head(full_name)="data")
        span {{$t("contacts.table_head_fullName")}}
      template(v-slot:head(total_addresses)="data")
        span {{$t("contacts.table_head_total_addresses")}}
      template(v-slot:head(total_phones)="data")
        span {{$t("contacts.table_head_total_phones")}}
      template(v-slot:head(total_emails)="data")
        span {{$t("contacts.table_head_total_emails")}}

      template(v-slot:head(created_at)="data")
        span {{$t("strings.created_at")}}
      template(v-slot:head(updated_at)="data")
        span {{$t("strings.updated_at")}}
      template(v-slot:head(actions)="data")
        span {{$t("strings.actions")}}
      template(v-slot:head(show_details)="data")
        span {{$t("strings.show_details")}}

      template(v-slot:cell(full_name)="data")
        span {{data.item.first_name}} {{data.item.last_name}} {{data.item.second_last_ame}}
      template(v-slot:cell(total_addresses)="data")
        span {{data.item.count_addresses}}
      template(v-slot:cell(total_phones)="data")
        span {{data.item.count_phones}}
      template(v-slot:cell(total_emails)="data")
        span {{data.item.count_emails}}
      template(v-slot:cell(created_at)="data")
        span {{ data.item.created_at | moment("dddd D, MMMM YYYY") }}
      template(v-slot:cell(updated_at)="data")
        span {{ data.item.updated_at | moment("dddd D, MMMM YYYY") }}
      template(v-slot:cell(actions)="data")
        b-button.btn.table-btn.mb-2(
          size="sm"
          style="margin-right: 5px"
          @click="data.toggleDetails"
          :title="(data.detailsShowing ? $t('strings.hide') : $t('strings.show'))+' '+$t('strings.details')"
        )
          b-icon(
            icon="eye"
            style="color: #fff;margin-right:5px"
          )
          span {{ data.detailsShowing ? $t('strings.hide') : $t('strings.show') }} {{ $t('strings.details') }}

        b-button.btn.table-btn.mb-2(
          size="sm"
          style="margin-right: 5px"
          @click="handleEditContact(data.item)"
          :title="$t('strings.edit')"
        )
          b-icon(
            icon="pencil"
            style="color: #fff; margin-right: 5px"
          )
          | {{$t('strings.edit')}}

        b-button.btn-danger.table-btn.mb-2(
          :title="$t('strings.delete')"
          @click="deleteContactConfirm(data.item)"
          size="sm"
        )
          b-icon(
            icon="trash-fill"
            style="color: #fff; margin-right: 5px"
          )
          | {{$t('strings.delete')}}

      template(#row-details='data')
        b-container(fluid)
          b-row
            b-col(md="4")
              b-card
                b-card-title.d-flex.justify-content-between {{$t("contacts.table_head_total_addresses")}}
                  b-button.btn.table-btn.mb-2(
                    size="sm"
                    style="margin-right: 5px"
                    @click="addAddress(data.item)"
                    :title="$t('strings.add')"
                  )
                    b-icon(
                      icon="person-plus"
                      style="color: #fff; margin-right: 5px"
                    )
                    | {{$t('strings.add')}}
                b-card-text
                  b-list-group()
                    b-list-group-item.flex-column.align-items-start(
                      v-for="(address, key) in data.item.addresses" :key="key"
                      :class="(address.primary) ? 'active' : ''"
                    )
                      .d-flex.justify-content-between
                        strong.mb-1 {{address.street_name}} {{ ', #' + address.street_number}}
                        strong(v-if="address.street_number_int!=null") , INT {{address.street_number_int}}
                        small {{address.country}}, {{address.state}}, {{address.city}}

                      p
                        strong {{$t("contacts.other_details")}}
                        br/
                        | {{address.other_details}}

                      .mb-1 {{$t("contacts.zipcode") + ' :'}} {{address.zipcode}}
                      hr
                      .mt-3
                        b-button.btn.table-btn.mb-2(
                          size="sm"
                          style="margin-right: 5px"
                          @click="editAddress(address)"
                          :title="$t('strings.edit')"
                        )
                          b-icon(
                            icon="pencil"
                            style="color: #fff; margin-right: 5px"
                          )
                          | {{$t('strings.edit')}}
                        b-button.btn-danger.table-btn.mb-2(
                          :title="$t('strings.delete')"
                          @click="deleteAddressConfirm(address)"
                          size="sm"
                        )
                          b-icon(
                            icon="trash-fill"
                            style="color: #fff; margin-right: 5px"
                          )
                          | {{$t('strings.delete')}}

            b-col(md="4")
              b-card
                b-card-title.d-flex.justify-content-between {{$t("contacts.table_head_total_emails")}}
                  b-button.btn.table-btn(
                    size="sm"
                    style="margin-right: 5px"
                    @click="addEmail(data.item)"
                    :title="$t('strings.add')"
                  )
                    b-icon(
                      icon="person-plus"
                      style="color: #fff; margin-right: 5px"
                    )
                    | {{$t('strings.add')}}
                b-card-text
                  b-list-group()
                    b-list-group-item.flex-column.align-items-start(
                      v-for="(email, key) in data.item.emails" :key="key"
                      :class="(email.primary) ? 'active' : ''"
                    )
                      .d-flex.justify-content-between
                        strong.mb-1 {{email.email}}
                      hr
                      .mt-3
                        b-button.btn.table-btn(
                          size="sm"
                          style="margin-right: 5px"
                          @click="editEmail(email)"
                          :title="$t('strings.edit')"
                        )
                          b-icon(
                            icon="pencil"
                            style="color: #fff; margin-right: 5px"
                          )
                          | {{$t('strings.edit')}}

                        b-button.btn-success.table-btn(
                          title="Enviar Encuesta"
                          @click=""
                          style="margin-right: 5px"
                          size="sm"
                        )
                          b-spinner(variant="light" small style="margin-right: 5px" type="grow")
                          | Enviar Encuesta

                        b-button.btn-danger.table-btn(
                          :title="$t('strings.delete')"
                          @click="deleteEmailConfirm(email)"
                          size="sm"
                        )
                          b-icon(
                            icon="trash-fill"
                            style="color: #fff; margin-right: 5px"
                          )
                          | {{$t('strings.delete')}}

            b-col(md="4")
              b-card
                b-card-title.d-flex.justify-content-between {{$t("contacts.table_head_total_phones")}}
                  b-button.btn.table-btn(
                    size="sm"
                    style="margin-right: 5px"
                    @click="addPhone(data.item)"
                    :title="$t('strings.add')"
                  )
                    b-icon(
                      icon="person-plus"
                      style="color: #fff; margin-right: 5px"
                    )
                    | {{$t('strings.add')}}
                b-card-text
                  b-list-group()
                    b-list-group-item.flex-column.align-items-start(
                      v-for="(phone, key) in data.item.phones" :key="key"
                      :class="(phone.primary) ? 'active' : ''"
                    )
                      .d-flex.justify-content-between
                        strong {{phone.name}} - {{phone.phone}}
                      hr
                      .mt-3
                        b-button.btn.table-btn(
                          size="sm"
                          style="margin-right: 5px"
                          @click="editPhone(phone)"
                          :title="$t('strings.edit')"
                        )
                          b-icon(
                            icon="pencil"
                            style="color: #fff; margin-right: 5px"
                          )
                          | {{$t('strings.edit')}}

                        b-button.btn-success.table-btn(
                          title="Enviar Encuesta"
                          @click=""
                          style="margin-right: 5px"
                          size="sm"
                        )
                          b-spinner(variant="light" small style="margin-right: 5px" type="grow")
                          | Enviar Encuesta


                        b-button.btn-danger.table-btn(
                          :title="$t('strings.delete')"
                          @click="deletePhoneConfirm(phone)"
                          size="sm"
                        )
                          b-icon(
                            icon="trash-fill"
                            style="color: #fff; margin-right: 5px"
                          )
                          | {{$t('strings.delete')}}

      template(v-slot:cell(index)="data")
        span {{ data.index + 1 }}

    address-modal(
      ref='address_modal',
      :form='addressForm',
      :is-add='isAddressModalAdd',
      :is-visible='isAddressModalVisible',
    )

    email-modal(
      ref='email_modal',
      :form='emailForm',
      :is-add='isEmailModalAdd',
      :is-visible='isEmailModalVisible',
    )

    phone-modal(
      ref='phone_modal',
      :form='phoneForm',
      :is-add='isPhoneModalAdd',
      :is-visible='isPhoneModalVisible',
    )

</template>

<style scoped>

</style>
