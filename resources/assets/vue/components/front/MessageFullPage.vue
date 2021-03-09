<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class MessageFullPage extends Vue {
  @Prop() message;
  @Prop() variant;
}
</script>

<template lang="pug">
  .container()
    img.mt-5#logo-preloader(
      src='/images/logo.svg',
      alt='Logo'
    )

    strong.d-flex.justify-content-center.text-primary {{message}}
    
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