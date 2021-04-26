<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';

import dialog from '@/utils/dialog';
import HomeCard from '@/components/HomeCard.vue';

// TODO change
@Component({
             components: {
               HomeCard,
             },
           })
export default class Home extends Vue {
  @Action setBackUrl;
  @Action setMenu;
  @Action setDialogMessage;

  darkColor = '#000000';

  mounted() {
    this.setBackUrl('/');
    this.setMenu([
                   {
                     text: 'surveys.title',
                     key: 1,
                     handler: () => {
                       this.$router.push({path: '/surveys'})
                     },
                   },

                 ]);
  }


  get actualUser() {
    return this.$auth.user();
  }
}
</script>

<template lang="pug">
  b-container(tag='main' fluid)
    router-view(:style="{marginTop:'30px',}" v-if='$auth.ready()')



</template>
<style lang="scss" scoped>
#QR-CODE{
  width: 100%;
}
</style>
