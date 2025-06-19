<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import GroupProjects from "@/components/GroupProjects.vue";
const groups = ref({});
const isLoading = ref(true);
const err = ref("");
const selectedGroup = ref("");
const url = ref("")
const pkey = ref("")
const sampleTOKEN = import.meta.env.VITE_GITLAB_GROUP

//Fetching Group List
async function fetchGroups() {
  try {
    const response = await axios.get(`${url.value}api/v4/groups`, {
      headers: {
        "PRIVATE-TOKEN": pkey.value,
      },
      params: {
        min_access_level: 50,
      },
    });
    groups.value = response.data;
  
    isLoading.value = false;
  } catch (error) {
    err.value = error.message;
    console.log("hata: ", err.value);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  fetchGroups();
});
</script>

<template>
  <div>
    <h1>Group Projects' Data Fetching from GitLab</h1>
    <p>Credentials for Demo Use:</p>
    <p>URL: https://gitlab.com/</p>
    <p>Private Key: {{ sampleTOKEN }}</p>
    <div>
      <input type="text" v-model="url" placeholder="Enter URL">
      <input type="text" v-model="pkey" placeholder="Enter Key">
      <button @click="fetchGroups()">Fetch Projects</button>
      
    </div>
    <p v-if="isLoading">Fetching Data...</p>
    <p v-if="err !== ''">Error: {{ err }}</p>
    <div>
      <select v-model="selectedGroup">
        <option value="">Pick a group</option>
        <option
          v-for="group in groups"
          :key="group.id"
          :value="{ id: group.id, name: group.name }"
        >
          {{ group.name }}
        </option>
      </select>
      
    </div>
    <div>
      <GroupProjects
        :id="selectedGroup.id"
        :name="selectedGroup.name"
        :url="url"
        :pkey="pkey"
      ></GroupProjects>
    </div>
  </div>
</template>

<style scoped>
div {
  margin-bottom: 20px;
  margin-top: 20px;
}</style>
