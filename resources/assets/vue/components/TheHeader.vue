<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';

import TheMessageBadge from './TheMessageBadge.vue';
import TheSettings from './TheSettings.vue';

@Component({
  components: {
    TheSettings,
    TheMessageBadge,
  },
  computed: {
    ...mapState(['backUrl', 'csrfToken', 'menu']),
  },
})
export default class TheHeader extends Vue {
  logout() {
    this.$auth.logout({
      makeRequest: true,
      redirect: { name: 'auth.login' },
    });
  }

  showSettings(): void {
    (<any>this.$refs.the_settings).$refs.modal.show();
  }

  get homePath() {
    return this.$auth.user().home_path;
  }

  get path(): string {
    return this.$route.path;
  }
}
</script>

<template lang="pug">
div
  b-navbar.navbar-expand-lg(
    type='light'
  )
    b-container(fluid="" )
      b-link.back-button.text-secondary(v-show='path !== homePath', :to='backUrl')
        v-icon(name='arrow-left')

      b-navbar-brand(:to='homePath', :class='{"has-back": path !== homePath}')
        img.d-inline-block.align-top(
          src='images/logo.svg',
          alt='Logo',
          height=36,
        )

      b-navbar-toggle(target='nav_collapse')

      b-collapse#nav_collapse(is-nav)
        b-navbar-nav.ml-auto
          b-nav-item.menu(
            v-for='item in menu',
            :key='item.key',
            @click.prevent='item.handler',
            href='#',
          ) {{ $t(item.text) }}

          b-nav-item-dropdown(:text='$auth.user().name', style='margin-right: 80px !important;')
            b-dropdown-item(
              @click='showSettings',
            ) {{ $t('strings.settings') }}

            b-dropdown-item(
              @click='logout',
            ) {{ $t('home.logout') }}
  the-settings(ref='the_settings')
</template>

<style scoped>
.has-back {
  padding-left: 15px;
}

.github-link a {
  display: flex;
  align-items: center;
}
</style>
