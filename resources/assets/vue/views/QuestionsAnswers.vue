<script lang="ts">
import {Component, Vue, Emit} from 'vue-property-decorator';
import {Action, namespace} from 'vuex-class';
import QuestionsAnswersList from '@/components/questions_answers/QuestionsAnswersList.vue';

@Component(
    {
      components: {
        QuestionsAnswersList,
      }
    }
)
export default class QuestionsAnswers extends Vue {
  @Action setBackUrl;
  @Action setMenu;


  mounted() {
    this.setBackUrl('/surveys');
    this.setMenu(
        [

        ]
    );
  }
}
</script>

<template lang="pug">
  b-container(fluid="")
    b-row
      b-col
        h2 {{ $t('questions_answers.title') }}
        QuestionsAnswersList

</template>
<style lang="scss" scoped>

</style>
