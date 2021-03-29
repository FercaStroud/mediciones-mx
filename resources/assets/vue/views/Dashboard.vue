<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {Action, namespace} from 'vuex-class';

import dialog from '@/utils/dialog';
import HomeCard from '@/components/HomeCard.vue';
import LineChart from '@/components/charts/LineChart.vue';
import DoughnutChart from '@/components/charts/DoughnutChart.vue';

const sStore = namespace('surveys');

// TODO change
@Component({
  components: {
    HomeCard,
    LineChart,
    DoughnutChart
  },
})
export default class Home extends Vue {
  @Action setBackUrl;
  @Action setMenu;
  @Action setDialogMessage;
  @sStore.Action loadSurveys;
  @sStore.State surveys;

  loadingSurveys = true;
  surveyName = "Elige una encuesta del menú lateral";
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
    this.getSurveys(parseInt(this.actualUser.id));

  }


  get actualUser() {
    return this.$auth.user();
  }

  get chartHigherBuyersLastMonth() {
    return {
      //labels: this.nameHigherBuyersLastMonth,
      labels: ['january', 'february', 'march'],
      datasets: [{
        //label: 'Mayores compradores último mes ' + this.yearsSinceAppStartDate[0],
        label: 'Mayores compradores último mes ',
        //data: this.quantityHigherBuyersLastMonth,
        data: [2, 4, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    }
  }

  async getSurveys(user_id: number): Promise<void> {
    await this.loadSurveys({ user_id });
    this.loadingSurveys = false;
  }

  loadInformationBySurvey(survey_id: number, survey_title: string){
    this.surveyName = survey_title;
    //console.log(survey_id);
  }
}
</script>

<template lang="pug">
  b-container(tag='main' fluid)
    router-view(:style="{marginTop:'30px',}" v-if='$auth.ready()')
    b-row(class="justify-content-md-center")
      h1  Resultados
    b-row(class="justify-content-md-center")
      h3  {{surveyName}}
    b-row
      b-col(md="2")
        b-card-group(deck)
          b-card(header="Encuestas")
            div(class="text-center")
              b-spinner(v-if="loadingSurveys" small)
            b-list-group(v-for="survey in surveys")
              b-list-group-item(button @click="loadInformationBySurvey(survey.id, survey.title)") {{survey.title}}
      b-col(md="8" offset-md="1")
          b-row(class="justify-content-md-center")
            b-col(md="5" offset-md="1")
              line-chart(:chart-data="chartHigherBuyersLastMonth" :options="optionsHigherBuyersLastMonth")
            b-col(md="5" offset-md="1")
              doughnut-chart(:chart-data="chartHigherBuyersLastMonth" )




</template>
<style lang="scss" scoped>
#QR-CODE{
  width: 100%;
}
</style>
