<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="ecomApp.produit.home.createOrEditLabel"
          data-cy="ProduitCreateUpdateHeading"
          v-text="$t('ecomApp.produit.home.createOrEditLabel')"
        >
          Create or edit a Produit
        </h2>
        <div>
          <div class="form-group" v-if="produit.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="produit.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('ecomApp.produit.nom')" for="produit-nom">Nom</label>
            <input
              type="text"
              class="form-control"
              name="nom"
              id="produit-nom"
              data-cy="nom"
              :class="{ valid: !$v.produit.nom.$invalid, invalid: $v.produit.nom.$invalid }"
              v-model="$v.produit.nom.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('ecomApp.produit.prix')" for="produit-prix">Prix</label>
            <input
              type="number"
              class="form-control"
              name="prix"
              id="produit-prix"
              data-cy="prix"
              :class="{ valid: !$v.produit.prix.$invalid, invalid: $v.produit.prix.$invalid }"
              v-model.number="$v.produit.prix.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('ecomApp.produit.lienImage')" for="produit-lienImage">Lien Image</label>
            <input
              type="text"
              class="form-control"
              name="lienImage"
              id="produit-lienImage"
              data-cy="lienImage"
              :class="{ valid: !$v.produit.lienImage.$invalid, invalid: $v.produit.lienImage.$invalid }"
              v-model="$v.produit.lienImage.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('ecomApp.produit.marque')" for="produit-marque">Marque</label>
            <input
              type="text"
              class="form-control"
              name="marque"
              id="produit-marque"
              data-cy="marque"
              :class="{ valid: !$v.produit.marque.$invalid, invalid: $v.produit.marque.$invalid }"
              v-model="$v.produit.marque.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('ecomApp.produit.modele')" for="produit-modele">Modele</label>
            <input
              type="text"
              class="form-control"
              name="modele"
              id="produit-modele"
              data-cy="modele"
              :class="{ valid: !$v.produit.modele.$invalid, invalid: $v.produit.modele.$invalid }"
              v-model="$v.produit.modele.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('ecomApp.produit.progressif')" for="produit-progressif">Progressif</label>
            <input
              type="checkbox"
              class="form-check"
              name="progressif"
              id="produit-progressif"
              data-cy="progressif"
              :class="{ valid: !$v.produit.progressif.$invalid, invalid: $v.produit.progressif.$invalid }"
              v-model="$v.produit.progressif.$model"
            />
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.produit.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./produit-update.component.ts"></script>
