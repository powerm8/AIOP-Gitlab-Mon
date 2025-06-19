<script setup>
import { ref, watch } from "vue";
import axios from "axios";

const props = defineProps(["projectId", "projectName", "url", "pkey"]);
const pipelines = ref([]);
const isLoading = ref(false);
const err = ref("");

// Fetching Group Projects Pipelines
async function fetchProjectsPipelines() {
  console.log(props.projectId);
  try {
    const response = await axios.get(
      `${props.url}api/v4/projects/${props.projectId}/pipelines`,
      {
        headers: {
          "PRIVATE-TOKEN": props.pkey,
        },
        params: {},
      }
    );
    pipelines.value = response.data;
    
    console.log(response.data);
    isLoading.value = false;
  } catch (error) {
    err.value = error.message;
    console.log("hata: ", err.value);
  } finally {
    isLoading.value = false;
  }
}

watch(
  () => props.projectId,
  (newVal) => {
    if (newVal) fetchProjectsPipelines(), (isLoading.value = true);
  }
);

//colors alterations
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
      <h2>Pipelines View of "{{ projectName }}"</h2>
      <button @click="fetchProjectsPipelines()">Update Status</button>
      <div class="container">
        <div
          class="box"
          v-for="pipeline in pipelines"
          :key="pipeline.id"
          :style="{
            backgroundColor: statusUpdateForBgColor(pipeline.status),
            color: statusUpdateForTxtColor(pipeline.status),
          }"
        >
          <div class="id">
            Pipeline ID:
            <a
              :href="pipeline.web_url"
              :style="{ color: statusUpdateForTxtColor(pipeline.status) }"
              target="_blank"
            >
              {{ pipeline.id }}</a
            >
          </div>
          <div class="status">Status: {{ pipeline.status }}</div>
          <div class="date">
            Last Update: {{ new Date(pipeline.updated_at) }}
          </div>
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
