<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="modele">
        <h2 class="jh-entity-heading" data-cy="modeleDetailsHeading">
          <span v-text="$t('ecomV2App.modele.detail.title')">Modele</span> {{ modele.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('ecomV2App.modele.modele')">Modele</span>
          </dt>
          <dd>
            <span>{{ modele.modele }}</span>
          </dd>
          <dt>
            <span v-text="$t('ecomV2App.modele.produit')">Produit</span>
          </dt>
          <dd>
            <div v-if="modele.produit">
              <router-link :to="{ name: 'ProduitView', params: { produitId: modele.produit.id } }">{{ modele.produit.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="modele.id" :to="{ name: 'ModeleEdit', params: { modeleId: modele.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./modele-details.component.ts"></script>
