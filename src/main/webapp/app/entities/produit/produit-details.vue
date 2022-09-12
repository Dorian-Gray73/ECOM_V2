<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="produit">
        <h2 class="jh-entity-heading" data-cy="produitDetailsHeading">
          <span v-text="$t('ecomV2App.produit.detail.title')">Produit</span> {{ produit.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('ecomV2App.produit.nom')">Nom</span>
          </dt>
          <dd>
            <span>{{ produit.nom }}</span>
          </dd>
          <dt>
            <span v-text="$t('ecomV2App.produit.prix')">Prix</span>
          </dt>
          <dd>
            <span>{{ produit.prix }}</span>
          </dd>
          <dt>
            <span v-text="$t('ecomV2App.produit.lienImage')">Lien Image</span>
          </dt>
          <dd>
            <span>{{ produit.lienImage }}</span>
          </dd>
          <dt>
            <span v-text="$t('ecomV2App.produit.marque')">Marque</span>
          </dt>
          <dd>
            <span>{{ produit.marque }}</span>
          </dd>
          <dt>
            <span v-text="$t('ecomV2App.produit.progressif')">Progressif</span>
          </dt>
          <dd>
            <span>{{ produit.progressif }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="produit.id" :to="{ name: 'ProduitEdit', params: { produitId: produit.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./produit-details.component.ts"></script>
