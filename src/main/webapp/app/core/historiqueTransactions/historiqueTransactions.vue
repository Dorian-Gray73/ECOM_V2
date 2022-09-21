<template>
  <div id="pagePanier">
    <!-- Progression Panier -->
    <div id="contenuPanier">
      <div id="produitPanier">
        <div v-for="transaction in historique" :key="transaction.id" class="produit">
          <div class="numeroCommande">N° Commande : {{ transaction.id }}</div>
          <div class="dateCommande">Date : {{ transaction.date }}</div>
          <div class="etatCommande">État : {{ transaction.etat }}</div>
          <div class="ligneTransaction" v-fort="ligne in transaction.ligneTransactions">
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./historiqueTransactions.component.ts"></script>
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
  height: 864px;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 32px;
  overflow: auto;
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
