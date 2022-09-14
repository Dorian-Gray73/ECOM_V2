<template>
  <div id="app">
    <div id="app-header">
      <navbar></navbar>
    </div>
    <div class="container-fluid" id="containerfluid">
      <router-view></router-view>
      <jhi-footer></jhi-footer>
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

#title {
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 31px;
  margin-left: 4%;
}

#separate {
  background-color: #5b85aa;
  border: 2px solid #5b85aa;
  height: 0px;
  margin-top: 4px;
}

#app {
  font-style: normal;
  color: #5b85aa;
  background-color: #f7f7f7;
}

#containerfluid {
  padding-left: 0;
  padding-right: 0;
}

a {
  text-decoration: none;
}
</style>
