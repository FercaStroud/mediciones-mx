<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {namespace} from 'vuex-class';

const qAStore = namespace('questions_answers');

let results;

@Component(
  {
    components: {},
  }
)

export default class QuestionsAnswersList extends Vue {
  @qAStore.Action loadQuestionsAnswers;
  @qAStore.State isLoading;
  @qAStore.State fields;
  @qAStore.State questions_answers;
  results;

  mounted() {
    this.results = [];
    this.$nextTick(() => {
      this.getQuestionsAnswers(parseInt(this.$route.params.survey_id));
    });
  }

  async getQuestionsAnswers(survey_id: number): Promise<void> {
    this.loadQuestionsAnswers({survey_id});
    this.onFiltered(this.questions_answers);
  }

  onFiltered(items) {
    this.results = [];
    let results;

    results = [];
    const map = new Map();
    for (const item of items) {
      if (!map.has(item.question)) {
        map.set(item.question, true);
        results.push(
          {
            title: item.question,
            answers: [],
            filteredAnswers: [],
          }
        );
      }
    }

    items.forEach(function (value, index) {
      results.forEach(function (data, key) {
        if (value.question === data.title) {
          results[key].answers.push(value.answer);
        }
      });
    });

    results.forEach(function (value, index) {
      (value.answers).forEach(function (data, key) {
        if (!map.has(data)) {
          map.set(data, true);
          results[index].filteredAnswers.push(
            {
              title: data,
              count: 0
            }
          );
        }
      });
    });

    results.forEach(function (value, index) {
      (value.filteredAnswers).forEach(function (filteredAnswer, i) {
        (value.answers).forEach(function (answer, j) {
          if (filteredAnswer.title === answer) {
            filteredAnswer.count++;
          }
        });
      });
    });

    this.results = results;
  }

}
</script>

<template lang="pug">
  div
    b-row
      b-col(md="12")
        b-form
          b-form-group(
            label='Filtro'
            description='Ingrese texto para iniciar búsqueda'
            label-for='query',
          )
            b-form-input#query(
              type='text',
              v-model='fields.query',
              required,
            )
    b-row.mb-5
      b-col(
        md="4"
        v-for="(result, key) in results"
        :key="key"
      )
        b-card(:title="'Pregunta: ' + result.title")
          b-card-text
            b-button.m-1(
              size="sm"
              v-for="(filteredAnswer,index) in result.filteredAnswers"
              :key="index"
              variant="primary"
            ) {{ filteredAnswer.title }}
              b-badge.m-1(variant="light") [{{ filteredAnswer.count }}]



    b-button.btn.table-btn.mr-2(
      style="margin-bottom: 5px"
      @click="getQuestionsAnswers(parseInt($route.params.survey_id))"
    ) {{ $t('strings.update_table') }}

    b-table.btable(
      style="max-height: max-content;"
      striped
      hover
      responsive
      sticky-header
      no-border-collapse
      outlined
      head-variant="dark"
      :busy="isLoading"
      :items="questions_answers"
      :fields="fields"
      :filter="fields.query"
      :filter-included-fields="[]"
      @filtered="onFiltered"
    )
      template(#table-busy)
        div.text-center.text-danger
          b-spinner.align-middle

      template(v-slot:head(question)="data")
        span {{$t("questions_answers.question")}}
      template(v-slot:head(answer)="data")
        span {{$t("questions_answers.answer")}}

      template(v-slot:cell(index)="data")
        span {{ data.index + 1 }}


</template>

<style scoped>

</style>
