<script lang="ts">
import {Component, Vue, Emit} from 'vue-property-decorator';
import {Action, namespace} from 'vuex-class';
import ContactList from '@/components/contacts/ContactList.vue';
import ContactModal from '@/components/contacts/ContactModal.vue';

const cStore = namespace('contacts');

@Component(
    {
      components: {
        ContactList,
        ContactModal
      }
    }
)
export default class Contacts extends Vue {
  @Action setBackUrl;
  @Action setMenu;
  @cStore.Action setModalVisible;
  @cStore.Action setForm;
  @cStore.Action setModalAdd;
  @cStore.State isModalVisible;
  @cStore.State isModalAdd;
  @cStore.State form;

  contact: Partial<Contact> = {};

  mounted() {
    this.setBackUrl('/dashboard');
    this.setMenu(
        [
          {
            text: 'contacts.add_contact',
            key: 1,
            handler: this.addContact
          },
        ]
    );
  }
  addContact(): void {
    this.setForm(this.contact);
    this.setModalAdd(true);
    this.setModalVisible(true);
  }
}
</script>

<template lang="pug">
  b-container(fluid="")
    b-row
      b-col
        h2 {{ $t('contacts.title') }}
        ContactList

    contact-modal(
      ref='contact_modal',
      :form='form',
      :is-add='isModalAdd',
      :is-visible='isModalVisible',
    )

</template>
<style lang="scss" scoped>

</style>
