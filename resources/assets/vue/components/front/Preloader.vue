<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Preloader extends Vue {
  @Prop() isLoading;
}
</script>

<template lang="pug">
  .container(v-if="isLoading")
    img.mt-5#logo-preloader(
      src='/images/logo.svg',
      alt='Logo'
    )
    .d-flex.justify-content-center.spinner-container
      b-spinner#b-spinner.m-5(
        variant="primary"
        type="grow"
      )
    strong.d-flex.justify-content-center.text-primary {{ $t('strings.preloader_is_loading') }}
    
</template>

<style lang="scss" scoped>
#logo-preloader{
  width: 200px;
  margin-left: 50%;
  left: -100px;
  position: relative;
}
#b-spinner{
  width: 7rem; height: 7rem;
}
</style>