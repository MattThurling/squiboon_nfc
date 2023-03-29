<template>
  <div class="h-screen flex flex-col justify-center items-center py-12 px-4">
    <p class="text-4xl text-center mb-12">
      {{ question.body }}
    </p>
    <div class="">
      <p class="text-2xl text-center mb-12">
        {{ info }}
      </p>
      <p class="text-2xl text-center mb-12">
        {{ sId }}
      </p>
      <button class="btn btn-lg btn-primary mx-4" @click="scan">Scan</button>
    </div>
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
  import { nfc } from '../nfc'

  const question = ref({id: null, body: null})
  const route = useRoute()
  const sId = ref('---')
  const info = ref('Press the button to scan your NFC tag.')

  onMounted(async() => {
    let response = await axios.get(`https://squiboon.nw.r.appspot.com/api/questions/${route.params.id}`)
    scan()
    question.value = response.data
  })


  
  const scan = async () => {
    console.log('scan')
    try {

      await nfc.scan()
      console.log('> Scan started')
      info.value = 'Scan started. Hold your NFC tag near the device.'

      const listenerObject: EventListenerObject = {
        handleEvent: (e: any) => {
          sId.value = e.serialNumber
          console.log(`> Serial Number: ${e.serialNumber}`)
          console.log(`> Records: (${e.message.records.length})`)
        },
      }

      nfc.addEventListener('reading', listenerObject)
      nfc.addEventListener('readingerror', () => {
        console.log('Argh! Cannot read data from the NFC tag. Try another one?')
      })
    } catch (error) {
      console.log('Argh! ' + error)
    }
  }
</script>



