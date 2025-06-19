<script setup></script>

<template>
  <head>
    <title>All in One Page Gitlab Monitor</title>
  </head>
  <div>
    <div><h1>All in One Page Gitlab Monitor</h1></div>
    <nav>
      <RouterLink to="/">User Projects |</RouterLink>
      <RouterLink to="/groupProjects">Group Projects</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<style scoped></style>
