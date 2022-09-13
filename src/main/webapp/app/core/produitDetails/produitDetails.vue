<template>
  <div id="containerProduit">
    <div id="produit">
      <div id="photo"></div>
      <div id="textMonture">
        <div id="nomMonture">Nom de la monture</div>
        <div id="formeMonture">Forme de la monture</div>
        <div id="couleurMonture">Couleur de la monture</div>
      </div>
    </div>
    <div id="caracteristiques">
      <div>Prix</div>
      <div>Couleur</div>
      <b-button>Commander</b-button>
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
  background: #ffffff;
}

#caracteristiques {
  display: flex;
  padding: 32px;
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

#textMonture {
  display: flex;
  flex-direction: column;
}
</style>
