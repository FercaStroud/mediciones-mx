<script lang="ts">
import {Component, Vue, Emit} from 'vue-property-decorator';
import {Action, namespace} from 'vuex-class';
import AnswerList from '@/components/answers/AnswerList.vue';
import AnswerModal from '@/components/answers/AnswerModal.vue';

const aStore = namespace('answers');

@Component(
    {
      components: {
        AnswerList,
        AnswerModal
      }
    }
)
export default class Questions extends Vue {
  @Action setBackUrl;
  @Action setMenu;
  @aStore.Action setModalVisible;
  @aStore.Action setForm;
  @aStore.Action setModalAdd;
  @aStore.State isModalVisible;
  @aStore.State isModalAdd;
  @aStore.State form;

  answer: Partial<Answer> = {};

  mounted() {
    this.answer.question_id = parseInt(this.$route.params.question_id);
    //this.answer.end_survey = false;
    //this.answer.required = true;
    this.setForm(this.answer)

    this.setBackUrl('/questions/' + parseInt(this.$route.params.survey_id));
    this.setMenu(
        [
          {
            text: 'answers.add_answer',
            key: 1,
            handler: this.addAnswer
          },
        ]
    );
  }
  addAnswer(): void {
    this.setForm(this.answer);
    this.setModalAdd(true);
    this.setModalVisible(true);
  }
}
</script>

<template lang="pug">
  b-container(fluid="")
    b-row
      b-col
        h2 {{ $t('answers.title') }}
        AnswerList

    answer-modal(
      ref='question_modal',
      :answer_id='$route.params.answer_id'
      :form='form',
      :is-add='isModalAdd',
      :is-visible='isModalVisible',
    )

</template>
<style lang="scss" scoped>

</style>
