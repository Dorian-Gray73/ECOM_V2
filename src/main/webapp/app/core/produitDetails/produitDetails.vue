<template>
  <div id="containerProduit">
    <div id="produit">
      <img :src="`/content/images/${caracteristique.images[0].lienImage}`" id="photo" alt="" />
      <div id="textMonture">
        <div id="nomMonture">{{ caracteristique.produit.nom }}</div>
        <div id="marqueMonture">{{ caracteristique.produit.marque }}</div>
        <div id="couleurMonture">{{ caracteristique.couleur }}</div>
        <div v-if="caracteristique.quantite > 0" id="quantiteMonture">Disponible</div>
        <div v-else id="quantiteMontureNonDispo">Non disponible</div>
      </div>
    </div>
    <div>
      <div id="caracteristiques">
        <div id="divPrix">
          <div id="textPrix">Prix</div>
          <div>{{ caracteristique.produit.prix }}€</div>
        </div>
        <div>Couleur</div>
        <div id="couleurs">
          <div
            v-for="cara in caracteristiques"
            v-on:click="changeCaracteristique(cara.id)"
            :key="cara.id"
            class="couleur"
            :style="{ background: cara.couleur }"
          >
            <div class="cercle" />
            <div>{{ cara.couleur }}</div>
          </div>
        </div>
        <b-button v-if="caracteristique.quantite > 0" id="btnCommander" v-on:click="addProduit(caracteristique)"
          >Ajouter au panier
        </b-button>
      </div>
      <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
        <font-awesome-icon icon="arrow-left" />
        <span>Retour</span>
      </button>
    </div>
  </div>
</template>
<script lang="ts" src="./produitDetails.component.ts"></script>
<style scoped>
#containerProduit {
  display: flex;
  gap: 64px;
  margin-bottom: 20px;
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
  width: 512px;
  height: 512px;
  background-color: #f7f7f7;
  object-fit: cover;
}

#marqueMonture {
  border: solid 1px #5b85aa;
  text-align: center;
}

#couleurMonture {
  border: solid 1px #5b85aa;
  text-align: center;
}

#quantiteMonture {
  border: solid 1px #28965a;
  color: #28965a;
  text-align: center;
}

#quantiteMontureNonDispo {
  border: solid 1px indianred;
  color: indianred;
  text-align: center;
}

#textMonture {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

#nomMonture {
  font-weight: 700;
  font-size: 24px;
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

  height: 55px;

  background: #5b85aa;
  margin: auto;
}

.cercle {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: solid 2px black;
}

#couleurs {
  display: flex;
  flex-direction: row;
  gap: 16px;
}

.couleur {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
</style>
