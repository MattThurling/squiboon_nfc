<template>
  <div class="py-12 px-4">
    <h1 class="text-4xl mb-12">
      Select active question
    </h1>
    <div v-for="question in questions">
      <a :href="`/questions/${question.id}`">{{ question.body }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import axios from 'axios'

  const questions = ref([{id: null, body: null}])

  onMounted(async() => {
    let response = await axios.get('https://squiboon.nw.r.appspot.com/api/questions')
    questions.value = response.data
  })

</script>