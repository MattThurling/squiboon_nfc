<template>
  <div class="h-screen flex flex-col justify-center items-center py-12 px-4">
    <p class="text-4xl mb-12">
      {{ question.body }}
    </p>
    <div class="mt-8">
      <button class="btn btn-lg btn-outline btn-primary mx-4" @click="">
        Yes
      </button>
      <button class="btn btn-lg btn-outline btn-primary mx-4" @click="">
        No
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import axios from 'axios'

  const question = ref({id: null, body: null})
  const route = useRoute()

  onMounted(async() => {
    let response = await axios.get(`https://squiboon.nw.r.appspot.com/api/questions/${route.params.id}`)
    question.value = response.data
  })

</script>

