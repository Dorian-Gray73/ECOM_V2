<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="image">
        <h2 class="jh-entity-heading" data-cy="imageDetailsHeading">
          <span v-text="$t('ecomApp.image.detail.title')">Image</span> {{ image.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('ecomApp.image.lienImage')">Lien Image</span>
          </dt>
          <dd>
            <span>{{ image.lienImage }}</span>
          </dd>
          <dt>
            <span v-text="$t('ecomApp.image.caracteristique')">Caracteristique</span>
          </dt>
          <dd>
            <div v-if="image.caracteristique">
              <router-link :to="{ name: 'CaracteristiqueView', params: { caracteristiqueId: image.caracteristique.id } }">{{
                image.caracteristique.id
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('ecomApp.image.produit')">Produit</span>
          </dt>
          <dd>
            <div v-if="image.produit">
              <router-link :to="{ name: 'ProduitView', params: { produitId: image.produit.id } }">{{ image.produit.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="image.id" :to="{ name: 'ImageEdit', params: { imageId: image.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./image-details.component.ts"></script>
