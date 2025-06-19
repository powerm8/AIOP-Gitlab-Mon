<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";


const GITLAB_URL = ref("");
const USER_ID = ref("");
const TOKEN = ref("");
const projectData = ref([]);
const pipelineData = ref([]);
const PROJECT_ID = ref("");
const PROJECT_NAME = ref("");
const sampleTOKEN = import.meta.env.VITE_GITLAB_USER


async function getProjects() {
  try {
    const headers = {};
    if (TOKEN.value.trim() !== "") {
      headers["PRIVATE-TOKEN"] = TOKEN.value;
    }
    const response = await axios.get(
      `${GITLAB_URL.value}api/v4/users/${USER_ID.value}/projects`,
      { headers }
    );
    console.log(response.data);
    projectData.value = response.data;
  } catch (error) {
    console.log(error.message);
  }
}

async function getPipelines() {
  try {
    const headers = {};
    if (TOKEN.value.trim() !== "") {
      headers["PRIVATE-TOKEN"] = TOKEN.value;
    }
    const response = await axios.get(
      `${GITLAB_URL.value}api/v4/projects/${PROJECT_ID.value}/pipelines`,
      { headers }
    );
    console.log(response.data);
    console.log(PROJECT_NAME.value);
    pipelineData.value = response.data;
  } catch (error) {
    console.log(error.message);
  }
}

function onProjectChange() {
  const selectedProject = projectData.value.find(
    (p) => p.id === PROJECT_ID.value
  );
  PROJECT_NAME.value = selectedProject ? selectedProject.name : "";
  getPipelines();
}
onMounted(() => {
  getProjects();
});

function statusUpdateForBgColor(status) {
  if (status === "success") return "green";
  if (status === "failed") return "red";
  if (status === "pending") return "orange";
  return "white";
}
function statusUpdateForTxtColor(status) {
  if (status === "success") return "white";
  if (status === "failed") return "white";
  if (status === "pending") return "black";
  return "black"; 
}
</script>

<template>

  <div>
      <div>
    <h1>User Projects' Data Fetching from GitLab</h1>
    <p>Credentials for Demo Use:</p>
    <p>URL: https://gitlab.com/</p>
    <p>UserID: 15554929</p>
    <p>Private Key: {{ sampleTOKEN }}</p>
      </div>
    <div>
      <form @submit.prevent="getProjects()">
        <input type="text" placeholder="Enter URL" v-model="GITLAB_URL" />
        <input type="text" placeholder="Usr ID" v-model="USER_ID" />
        <input type="text" placeholder="Api Key" v-model="TOKEN" />
        <button type="submit">Fetch Projects</button>
      </form>
    </div>
    <hr>
    <div>    <select v-model="PROJECT_ID" @change="onProjectChange">
      <option disabled value="">Pick A Project</option>
      <option v-for="project in projectData" :value="project.id">
        {{ project.name }}
      </option>
    </select>
    <button @click="getPipelines()">Update Status</button></div>

    <div>
      <h1>{{ PROJECT_NAME }}</h1>
      <div class="container">
        <div
          class="box"
          v-for="pdata in pipelineData"
          :key="pdata.id"
          :style="{ backgroundColor: statusUpdateForBgColor(pdata.status), color: statusUpdateForTxtColor(pdata.status) }"
        >
          <div class="id">Pipeline ID: <a :href="pdata.web_url" :style="{color: statusUpdateForTxtColor(pdata.status)}" target="_blank"> {{ pdata.id }}</a></div>
          <div class="status">Status: {{ pdata.status }}</div>
          <div class="date">Last Update: {{ new Date(pdata.updated_at) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
div {
  margin-bottom: 20px;
  margin-top: 20px;
}
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;

  width: 100%;
  max-width: 1400px;
  margin: 20px auto;

  max-height: 600px;
  overflow-y: auto;

  padding: 10px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.box {
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  text-align: center;


}

.box .id,
.box .status,
.box .date {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  margin-bottom: auto;
}

a {
  text-decoration: underline;

}
</style>
