<template>
  <div id="app">
    <div id="app-header">
      <!-- Navbar -->
      <navbar />
    </div>
    <div class="container-fluid" id="containerfluid">
      <!-- Routerview -->
      <router-view />
      <!-- Footer -->
      <footerComponent />
    </div>
  </div>
</template>

<script lang="ts" src="./app.component.ts"></script>

<style>
@font-face {
  font-family: 'Inter';
  src: local('Inter'), url('../content/fonts/Inter/Inter-Regular-400.otf') format('truetype');
}

@font-face {
  font-family: 'IBM';
  src: local('IBM'), url('../content/fonts/IBM/IBMPlexSerif-Regular.otf') format('truetype');
}

html {
  background-color: #f7f7f7;
  font-family: 'IBM';
}

.title {
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 31px;
  width: 100%;
}

.separate {
  background-color: #5b85aa;
  height: 2px;
  margin: 4px -128px 0 -128px;
  width: 100vw;
}

#app {
  font-style: normal;
  color: #5b85aa;
  background-color: #f7f7f7;
  padding: 32px 128px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

#containerfluid {
  padding-left: 0;
  padding-right: 0;
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}
</style>
