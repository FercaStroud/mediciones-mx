<script lang="ts">
import {Component, Vue, Emit} from 'vue-property-decorator';
import {Action, namespace} from 'vuex-class';
import QuestionList from '@/components/questions/QuestionList.vue';
import QuestionModal from '@/components/questions/QuestionModal.vue';

const qStore = namespace('questions');

@Component(
    {
      components: {
        QuestionList,
        QuestionModal
      }
    }
)
export default class Questions extends Vue {
  @Action setBackUrl;
  @Action setMenu;
  @qStore.Action setModalVisible;
  @qStore.Action setForm;
  @qStore.Action setModalAdd;
  @qStore.State isModalVisible;
  @qStore.State isModalAdd;
  @qStore.State form;

  question: Partial<Question> = {};

  mounted() {
    this.question.survey_id = parseInt(this.$route.params.survey_id);
    this.setForm(this.question)

    this.setBackUrl('/surveys');
    this.setMenu(
        [
          {
            text: this.$t('questions.add_question'),
            key: 1,
            handler: this.addQuestion
          },
        ]
    );
  }
  addQuestion(): void {
    this.question.input_type_id = 1;
    this.question.required = true;
    this.setForm(this.question);
    this.setModalAdd(true);
    this.setModalVisible(true);
  }
}
</script>

<template lang="pug">
  b-container(fluid="")
    b-row
      b-col
        h2 {{ $t('questions.title') }}
        QuestionList

    question-modal(
      ref='question_modal',
      :survey_id='$route.params.survey_id'
      :form='form',
      :is-add='isModalAdd',
      :is-visible='isModalVisible',
    )

</template>
<style lang="scss" scoped>

</style>
