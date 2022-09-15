<template>
  <div id="accueil">
    <span id="title">À la une</span>
    <hr id="separate" />
    <!-- Carousel -->
    <div id="carousel"></div>
    <div id="divBtn">
      <router-link to="/recherche" id="btnSolaire"> Collection Solaire </router-link>
      <router-link to="/recherche" id="btnVue"> Collection Vue </router-link>
    </div>
  </div>
</template>

<script lang="ts" src="./accueil.component.ts"></script>

<style scoped>
#carousel {
  width: 100%;
  height: 243px;
  background: rgba(91, 133, 170, 0.2);
}

#divBtn {
  display: flex;
  flex-direction: row;
}

#btnSolaire {
  width: 1352px;
  height: 593px;
  background-image: url('../../../content/images/recommandations/solaire.png');
  text-align: center;
  vertical-align: center;
  font-weight: 700;
  font-size: 48px;
  color: #ffffff;
}

#btnVue {
  width: 1352px;
  height: 593px;
  background-image: url('../../../content/images/recommandations/vue.png');
  text-align: center;
  vertical-align: center;
  font-weight: 700;
  font-size: 48px;
  color: #ffffff;
}

#btnSolaire:hover {
  text-decoration: none;
  color: #5b85aa;
}

#btnVue:hover {
  text-decoration: none;
  color: #5b85aa;
}
</style>
