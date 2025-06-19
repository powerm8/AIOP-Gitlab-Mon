<script setup>
import {ref, onMounted} from 'vue'
import axios from 'axios'
const people = ref({})
const isLoading = ref(true)
const err = ref("")

async function fetchPeople(){
    try {
        const response = await axios.get("https://vue-axios-8386c-default-rtdb.europe-west1.firebasedatabase.app/kisiler.json")
    people.value = response.data
    console.log(response.data)
    isLoading.value = false
    } catch (error) {
        err.value = error.message
        console.log("hata: ", err.value)
    }
    finally{
       isLoading.value = false 
    }
    
}
onMounted(()=>{
    fetchPeople()
})

</script>

<template>
  <div>
    <h1>Data Fetching from Firebase with Axios</h1>
    <p v-if="isLoading">Veriler Yükleniyor.</p>
    <p v-if="err !==''">Hata: {{ err }}</p>
    <div v-for="person in people" :key="person.id">
        <p>Ad: {{ person.ad }}</p>
        <p>Soyad: {{ person.soyad }}</p>
        <button>Delete</button>
    </div>

  </div>
</template>

<style scoped>

</style>