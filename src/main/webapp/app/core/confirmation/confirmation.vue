<template>
  <div id="pagePanier">
    <!-- Progression Panier -->
    <div class="progressionPanier">
      <div class="step done">Panier</div>
      <div class="step done">Connexion</div>
      <div class="step done">Paiement</div>
      <div class="step active">Confirmation</div>
    </div>
    <div id="contenuPanier">
      <div id="produitPanier">
        <div v-for="cara in panier" :key="cara.id" class="produit">
          <div v-if="cara.images == null || cara.images.length == 0" class="photoVide" />
          <img v-else :src="`/content/images/${cara.images[0].lienImage}`" class="photoProduit" alt="" />
          <div class="nomPrix">{{ cara.produit.nom }} <br />{{ cara.couleur }}<br />{{ cara.produit.prix }}€</div>
          <div class="quantite">Quantité : {{ quantite[cara.id] }}</div>
          <div class="prixTotal">Prix total : {{ quantite[cara.id] * cara.produit.prix }}€</div>
        </div>
      </div>
      <div id="validerCommande">
        <div>
          <font-awesome-icon icon="fa-solid fa-circle-check" />
          Commande validée
        </div>
        <div>Prix Total : {{ getPrixTotal() }}€</div>
        <div>Prix total avec livraison : {{ getPrixTotalLivraison() }}€</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./confirmation.component.ts"></script>
<style scoped>
#contenuPanier {
  display: flex;
  flex-direction: column;
  margin: 20px 128px;
  gap: 32px;
}

#produitPanier {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 32px;
  overflow: auto;
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

.step.done {
  font-weight: 200;
  text-align: center;
  border-bottom: solid 1px #5b85aa;
  padding-bottom: 7px;
}

.step.active {
  font-weight: bold;
  border-bottom: solid 1px #5b85aa;
  padding-bottom: 7px;
}

.produit {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 32px;
  gap: 64px;

  width: 100%;
  height: 192px;

  background: #ffffff;
}

.photoProduit {
  width: 128px;
  height: 128px;
  background-color: #f7f7f7;
  object-fit: cover;
}

.photoVide {
  width: 128px;
  height: 128px;
  background-color: #f7f7f7;
}

#contenuPanier {
  display: flex;
  margin: 20px 128px;
  gap: 32px;
}

.nomPrix {
  width: 100px;
}

#validerCommande {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #ffffff;
  width: 100%;
  height: 128px;
  gap: 64px;
  padding: 32px;
}
</style>
