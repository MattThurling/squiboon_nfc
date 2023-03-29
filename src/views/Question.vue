<template>
  <div class="h-screen flex flex-col justify-center items-center py-12 px-4">
    <p class="text-4xl text-center mb-12">
      {{ question.body }}
    </p>
    <button v-if="phase==0" class="btn btn-lg btn-outline btn-primary mx-4" @click="scan">Vote Now</button>
    <div v-if="phase==1">
      <p class="text-2xl text-center mb-12">
        Please tap your Squiboon card...
      </p>
    </div>
    <div v-if="phase==2">
      <p class="text-2xl text-center mb-12">What do you think, {{ profile.name }}...</p>
      <div class="text-center">
        <button @click="vote(true)" class="btn btn-lg btn-outline btn-primary mx-4">
          Yes
        </button>
        <button @click="vote(false)" class="btn btn-lg btn-outline btn-primary mx-4">
          No
        </button>
      </div>
      
    </div>
    <div v-if="phase==3" class="mt-8">
      <p class="text-2xl text-center mb-12">POLL RESULTS</p>
    </div>
    <div class="diagnostics">
      <p>{{ phase }} | {{ sId }} | {{ profile.name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import axios from 'axios'
  import { nfc } from '../nfc'

  const question = ref({id: null, body: null})
  const profile = ref({id: null, name: null, nfc: null})
  const route = useRoute()
  const sId = ref('---')
  const info = ref('Press the button to scan your NFC tag.')
  const phase = ref(0)

  onMounted(async() => {
    let response = await axios.get(`https://squiboon.nw.r.appspot.com/api/questions/${route.params.id}`)
    question.value = response.data
  })

  const getProfile = async () => {
    let u = encodeURIComponent(sId.value)
    console.log(u)
    let response = await axios.get(`https://squiboon.nw.r.appspot.com/api/profiles/nfc/${u}`)
    profile.value = response.data
  }

  const vote = async (v: boolean) => {
    alert('Voting')
    let response = await axios.post(`https://squiboon.nw.r.appspot.com/api/questions/${route.params.id}/answers/`, {
      profile_id: profile.value.id,
      value: v,
    })
    phase.value++
  }

  const scan = async () => {
    console.log('scan')
    try {

      await nfc.scan()
      phase.value++
      console.log('> Scan started')
      info.value = 'Scan started. Hold your NFC tag near the device.'

      const listenerObject: EventListenerObject = {
        handleEvent: (e: any) => {
          sId.value = e.serialNumber
          console.log(`> Serial Number: ${e.serialNumber}`)
          console.log(`> Records: (${e.message.records.length})`)
          getProfile()
          phase.value++
        },
      }


      nfc.addEventListener('reading', listenerObject)
      nfc.addEventListener('readingerror', () => {
        alert('Argh! Cannot read data from the NFC tag. Is NFC reading enabled on device?')
      })
    } catch (error) {
      alert('Argh! ' + error)
    }
  }
</script>



