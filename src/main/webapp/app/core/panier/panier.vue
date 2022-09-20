<template>
  <div id="pagePanier">
    <!-- Progression Panier -->
    <div class="progressionPanier">
      <div class="step active">Panier</div>
      <div class="step">Connexion</div>
      <div class="step">Paiement</div>
      <div class="step">Confirmation</div>
    </div>
    <div id="contenuPanier">
      <!-- Produits du panier -->
      <div id="produitPanier" :key="componentKey">
        <div v-for="cara in panier" :key="cara.id">
          <div class="produit">
            <img :src="`/content/images/${cara.images[0].lienImage}`" class="photoProduit" alt="" />
            <div class="nomPrix">{{ cara.produit.nom }} <br />Couleur : {{ cara.couleur }}<br />Prix : {{ cara.produit.prix }}€</div>
            <div class="quantite">Quantité : {{ quantite[cara.id] }}</div>
            <div class="prixTotal">Prix total : {{ quantite[cara.id] * cara.produit.prix }}€</div>
            <div v-on:click="deleteProduit(cara)">
              <font-awesome-icon icon="fa-solid fa-trash" />
            </div>
          </div>
        </div>
      </div>
      <!-- Récap du panier -->
      <div id="validerPanier">
        <div>Articles : {{ getPrixTotal() }}€</div>
        <div>Livraison : {{ livraison }}€</div>
        <div>Total : {{ getPrixTotalLivraison() }}€</div>
        <b-button v-on:click="commander()">Commander</b-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./panier.component.ts"></script>
<style scoped>
#contenuPanier {
  display: flex;
  margin: 20px 128px;
  gap: 32px;
}

#produitPanier {
  display: flex;
  width: 1032px;
  height: 864px;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 32px;
  overflow: auto;
}

#validerPanier {
  display: flex;
  flex-direction: column;
  padding: 32px;
  gap: 64px;
  width: 320px;
  height: 399px;
  background: #ffffff;
}

.produit {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 32px;
  gap: 48px;

  width: 1032px;
  height: 192px;

  background: #ffffff;
}

.photoProduit {
  width: 128px;
  height: 128px;
  background-color: #f7f7f7;
  object-fit: cover;
}

.progressionPanier {
  display: flex;
  margin: 0 128px;
  border-bottom: solid 1px #5b85aa;
}

.step {
  font-weight: 200;
  text-align: center;
  padding: 8px 64px;
}

.step.active {
  font-weight: bold;
  border-bottom: solid 1px #5b85aa;
  padding-bottom: 7px;
}

.nomPrix {
  width: 100px;
}
</style>
