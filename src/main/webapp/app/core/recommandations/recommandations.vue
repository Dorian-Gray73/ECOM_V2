<template>
  <div id="recommandations">
    <span class="title">À la une</span>
    <hr class="separate" />
    <!-- Carousel -->
    <div id="carousel"></div>
    <!-- Btn Collection -->
    <div id="divBtn">
      <router-link to="/recherche" id="btnSolaire" class="btnCollection"> Collection Solaire </router-link>
      <router-link to="/recherche" id="btnVue" class="btnCollection"> Collection Vue </router-link>
    </div>
  </div>
</template>

<script lang="ts" src="./recommandations.component.ts"></script>

<style scoped>
#recommandations {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

#carousel {
  width: 100%;
  height: 243px;
  background: rgba(91, 133, 170, 0.2);
}

#divBtn {
  display: flex;
  flex-direction: row;
  gap: 32px;
  padding: 32px 128px;
}

#btnSolaire {
  background-image: url('../../../content/images/recommandations/solaire.png');
}

#btnVue {
  background-image: url('../../../content/images/recommandations/vue.png');
}

.btnCollection {
  width: 1352px;
  height: 593px;
  text-align: center;
  vertical-align: center;
  font-weight: 700;
  font-size: 48px;
  color: #ffffff;
}

.btnCollection:hover {
  text-decoration: none;
  color: #5b85aa;
}

.btnCollection:hover {
  text-decoration: none;
  color: #5b85aa;
}
</style>
