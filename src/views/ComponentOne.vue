<script setup>
import {ref, watch, computed} from 'vue'
const var1 = ref("0")
const var2 = ref("0")
const name = ref("")
const lastName = ref("")
const match = ()=> {
    var2.value = var1.value    
}
watch((var2), (sonDeger, ilkDeger) =>{
        console.log("Var2 son değeri: ", sonDeger, " - Var2 önceki değeri: ", ilkDeger)
    })
//Computed Practice
const fullName = computed(() => name.value + " " + lastName.value)
console.log(fullName)
</script>

<template>
    <div>
        <h1>Practices</h1>
        <div>
            <h2>Watch</h2>
            <input type="text" v-model="var1">
            <button @click="match">Tıkla</button>
        </div>
        <hr>
        <div>
            <h2>Computed</h2>
            <input type="text" v-model="name">
            <input type="text" v-model="lastName">
            <p>{{ fullName }}</p>
            
            <button @click="match">Tıkla</button>
        </div>
    </div>
 
</template>

<style scoped>

</style>