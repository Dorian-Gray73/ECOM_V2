<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="caracteristique">
        <h2 class="jh-entity-heading" data-cy="caracteristiqueDetailsHeading">
          <span v-text="$t('ecomApp.caracteristique.detail.title')">Caracteristique</span> {{ caracteristique.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('ecomApp.caracteristique.couleur')">Couleur</span>
          </dt>
          <dd>
            <span>{{ caracteristique.couleur }}</span>
          </dd>
          <dt>
            <span v-text="$t('ecomApp.caracteristique.quantite')">Quantite</span>
          </dt>
          <dd>
            <span>{{ caracteristique.quantite }}</span>
          </dd>
          <dt>
            <span v-text="$t('ecomApp.caracteristique.lienImage')">Lien Image</span>
          </dt>
          <dd>
            <span>{{ caracteristique.lienImage }}</span>
          </dd>
          <dt>
            <span v-text="$t('ecomApp.caracteristique.ligneTransaction')">Ligne Transaction</span>
          </dt>
          <dd>
            <div v-if="caracteristique.ligneTransaction">
              <router-link :to="{ name: 'LigneTransactionView', params: { ligneTransactionId: caracteristique.ligneTransaction.id } }">{{
                caracteristique.ligneTransaction.id
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('ecomApp.caracteristique.produit')">Produit</span>
          </dt>
          <dd>
            <div v-if="caracteristique.produit">
              <router-link :to="{ name: 'ProduitView', params: { produitId: caracteristique.produit.id } }">{{
                caracteristique.produit.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="caracteristique.id"
          :to="{ name: 'CaracteristiqueEdit', params: { caracteristiqueId: caracteristique.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./caracteristique-details.component.ts"></script>
