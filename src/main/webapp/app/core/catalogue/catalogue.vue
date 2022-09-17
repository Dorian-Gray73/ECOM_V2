<template>
  <div id="pageRecherche">
    <span id="title">Tout le catalogue</span>
    <hr id="separate" />
    <div id="divPagination">
      <div id="affichageSearch">
        <!--Affiche catalogue -->
        <div v-for="produit in produits" :key="produit.id">
          <div class="cardPhoto">
            <router-link :to="`/produitDetails/${produit.id}`">
              <div id="photo"></div>
              <div class="caracteristique">
                <div id="nomMonture">{{ produit.nom }}</div>
                <div id="prixMonture">{{ produit.prix }}€</div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <!-- Pagination -->
      <b-pagination v-model="currentPage" :total-rows="rows" id="pagination"></b-pagination>
    </div>
  </div>
</template>
<script lang="ts" src="./catalogue.component.ts"></script>
<style scoped>
a:hover {
  text-decoration: none;
}

.caracteristique {
  padding: 0px;
  gap: 8px;
  margin-top: 10px;
}

#photo {
  width: 256px;
  height: 256px;
  background-color: #f7f7f7;
}

.cardPhoto {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 16px;

  width: 304px;
  height: 374px;

  background: #ffffff;
}

#affichageSearch {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0px;
  height: 1186px;
  margin: 20px 128px;
}

#divPagination {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

#pagination {
  margin: auto;
}
</style>
