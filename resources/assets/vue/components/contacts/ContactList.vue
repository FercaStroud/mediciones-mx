<script lang="ts">
import { Component, Vue, } from 'vue-property-decorator';
import { Action, State, namespace } from 'vuex-class';

import dialog from '@/utils/dialog';

const cStore = namespace('contacts');

@Component(
    {
      components: {
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

  mounted() {
    this.$nextTick(() => {
      this.getContacts();
    })
  }

  get actualUser() {
    return this.$auth.user();
  }

  handleEditContact(contact: Contact):void{
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
}
</script>

<template lang="pug">
  div
    b-button.btn.table-btn.mr-2(
      style="margin-bottom: 5px"
      @click="getContacts()"
    ) {{ $t('strings.update_table') }}

    pre {{ contacts }}


</template>

<style scoped>

</style>
