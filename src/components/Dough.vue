<template>
  <DoughnutChart :chartData=testData />
</template>

<script setup lang='ts'>
  import { DoughnutChart } from 'vue-chart-3'
  import { computed } from 'vue'
  import { Chart, registerables } from 'chart.js'
  import type { ChartData } from 'chart.js'

  Chart.register(...registerables)

  const props = defineProps({
    votes: {
      type: Array<number>,
      required: true,
    },
  })

  const testData = computed<ChartData<"doughnut">>(() => ({
      labels: ['Yes', 'No'],
      datasets: [
      {
        label: 'Votes',
        data: props.votes,
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }))

  const options = 
    {
      responsive: true,
      maintainAspectRatio: false,
    }

    
</script>