<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import ProjectPipelines from "./ProjectPipelines.vue";
const props = defineProps(["id", "name", "url", "pkey"]);
const projects = ref([]);
const isLoading = ref(false);
const err = ref("");
const selectedProject = ref("");

// Fetching Group Projects
async function fetchGroupProjects() {
  try {
    const response = await axios.get(
      `${props.url}api/v4/groups/${props.id}/projects`,
      {
        headers: {
          "PRIVATE-TOKEN": props.pkey,
        },
        params: {},
      }
    );
    projects.value = response.data;
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
  () => props.id,
  (newVal) => {
    if (newVal) fetchGroupProjects(), (isLoading.value = true);
  }
);
</script>

<template>
  <div>
    <h2>Projects of "{{ name }}"</h2>
    <p v-if="isLoading">Fetching Data...</p>

    <div>
      <select v-model="selectedProject">
        <option disabled value="">Pick a project</option>
        <option
          v-for="project in projects"
          :key="project.id"
          :value="{ projectId: project.id, projectName: project.name }"
        >
          {{ project.name }}
        </option>
      </select>
      <ProjectPipelines
        :projectId="selectedProject.projectId"
        :projectName="selectedProject.projectName"
        :url="props.url"
        :pkey="props.pkey"
      >
      </ProjectPipelines>
    </div>
  </div>
</template>

<style scoped></style>
