<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: {
    chartData : {},
    options: {},
  },

  mounted () {
    this.renderChart(this.chartData, this.options)
  },
  methods:{
  },
  watch:{
    chartData: function (){
      this.renderChart(this.chartData, this.options)
    }
  }
}

</script>