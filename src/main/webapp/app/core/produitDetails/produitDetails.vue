<template>
  <div id="containerProduit">
    <div id="produit">
      <div id="photo"></div>
      <div id="textMonture">
        <div id="nomMonture">{{ produit.nom }}</div>
        <div id="marqueMonture">{{ produit.marque }}</div>
        <div id="couleurMonture">{{ produit.couleur }}</div>
      </div>
    </div>
    <div id="caracteristiques">
      <div id="divPrix">
        <div id="textPrix">Prix</div>
        <div>{{ produit.prix }}€</div>
      </div>
      <div>Couleur</div>
      <b-button id="btnCommander" v-on:click="addPanier()">Commander</b-button>
    </div>
  </div>
</template>
<script lang="ts" src="./produitDetails.component.ts"></script>
<style scoped>
#containerProduit {
  display: flex;
  margin: 20px 128px;
  gap: 64px;
}

#produit {
  display: flex;
  width: 954px;
  height: 576px;
  padding: 32px;
  gap: 49px;
  background: #ffffff;
}

#caracteristiques {
  display: flex;
  padding: 32px;
  gap: 32px;
  width: 394px;
  height: 379px;
  background: #ffffff;
  flex-direction: column;
}

#photo {
  flex: none;
  order: 0;
  flex-grow: 0;
  width: 512px;
  height: 512px;
  background: #f7f7f7;
}

#marqueMonture {
  border: solid 1px #5b85aa;
  text-align: center;
}

#textMonture {
  display: flex;
  flex-direction: column;
}

#nomMonture {
  font-weight: 700;
  font-size: 32px;
}

#textPrix {
  font-weight: 700;
  font-size: 18px;
}

#divPrix {
  gap: 8px;
}

#btnCommander {
  padding: 16px 32px;
  gap: 10px;

  width: 168px;
  height: 55px;

  background: #5b85aa;
  margin: auto;
}
</style>
