<template>
  <div id="pageRecherche">
    <span id="title">Résultats de la recherche</span>
    <hr id="separate" />
    <div id="resultat">
      <!-- SearchBar -->
      <b-input-group id="searchBar">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" id="iconSearchBar" />
        <b-form-input placeholder="Nom d'une monture" id="inputSearchBar" v-model="search" />
      </b-input-group>

      <div id="containerSearch">
        <!-- Filtre -->
        <div id="filtres">
          <div>Couleur</div>
          <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-checkbox-group
              v-model="selected"
              :options="options"
              :aria-describedby="ariaDescribedby"
              name="flavour-2a"
              stacked
            ></b-form-checkbox-group>
          </b-form-group>
          <div>Prix</div>
        </div>
        <div id="divPagination">
          <!-- Affichage Search -->
          <div id="affichageSearch">
            <div v-for="produit in produitList" :key="produit.id">
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
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="produittList"
            align="center"
            id="pagination"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./recherche.component.ts"></script>
<style scoped>
#searchBar {
  background-color: #ffffff;
  display: flex;
  gap: 16px;
  padding: 8px 16px;
}

#inputSearchBar {
  margin: auto;
  border: none;
  flex: 1;
}

#iconSearchBar {
  width: 16px;
  margin: auto;
}

#containerSearch {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  gap: 32px;
  height: 1186px;
  margin: 32px 0;
}

#affichageSearch {
  flex: 6;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0px;
  gap: 32px;
  height: 1186px;
}

/*#affichageSearch::after {
  content: '';
  flex: auto;
}*/

#filtres {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 32px;
  gap: 64px;
  background: #ffffff;
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

#photo {
  width: 256px;
  height: 256px;
  background-color: #f7f7f7;
}

#resultat {
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 20px 128px;
}

#pagination {
  margin: auto;
}

a:hover {
  text-decoration: none;
}

.caracteristique {
  padding: 0px;
  gap: 8px;
  margin-top: 10px;
}

#divPagination {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
