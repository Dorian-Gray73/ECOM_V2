<template>
  <div id="containerProduit">
    <div id="produit">
      <div v-if="caracteristique.images == null || caracteristique.images.length === 0" id="photoVide" />
      <img v-else :src="`/content/images/${caracteristique.images[0].lienImage}`" id="photo" alt="" />
      <div id="textMonture">
        <div v-if="caracteristique.produit != null && caracteristique.produit !== undefined" id="nomMonture">
          {{ caracteristique.produit.nom }}
        </div>
        <div v-if="caracteristique.produit != null && caracteristique.produit !== undefined" id="marqueMonture">
          {{ caracteristique.produit.marque }}
        </div>
        <div v-if="caracteristique != null && caracteristique !== undefined" id="couleurMonture">{{ caracteristique.couleur }}</div>
        <div v-if="caracteristique.quantite > 0" id="quantiteMonture">Disponible</div>
        <div v-else id="quantiteMontureNonDispo">Non disponible</div>
        <div id="divBtnRetour">
          <button id="btnRetour" type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
            <font-awesome-icon icon="arrow-left" />
            <span>Retour</span>
          </button>
          <button id="btnTextToSpeech" type="submit" class="btn btn-info" data-cy="entityDetailsBackButton">
            <font-awesome-icon :icon="['fas', 'volume-up']" />
          </button>
        </div>
      </div>
    </div>
    <div>
      <div id="caracteristiques">
        <div id="divPrix">
          <div id="textPrix">Prix</div>
          <div v-if="caracteristique.produit != null && caracteristique.produit !== undefined">{{ caracteristique.produit.prix }}€</div>
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
        <b-button
          v-if="
            caracteristique.quantite > 0 &&
            ($store.getters.quantite[caracteristique.id] == null || caracteristique.quantite > $store.getters.quantite[caracteristique.id])
          "
          id="btnCommander"
          v-on:click="addProduit(caracteristique)"
          :key="componentKey"
          >Ajouter au panier
        </b-button>
        <b-button
          v-if="caracteristique.quantite > 0 && caracteristique.quantite === $store.getters.quantite[caracteristique.id]"
          id="btnCommanderDisabled"
          disabled
          :key="componentKey2"
          >Vous avez pris le maximum de produit disponible
        </b-button>
      </div>
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

#photoVide {
  width: 512px;
  height: 512px;
  background-color: #f7f7f7;
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

#btnCommander {
  padding: 16px 32px;
  gap: 10px;

  height: 75px;

  background: #5b85aa;
  margin: auto;
}

#divBtnRetour {
  display: flex;
  flex-direction: row;
  gap: 18px;
}
#btnRetour {
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
