<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="ecomV2App.image.home.createOrEditLabel"
          data-cy="ImageCreateUpdateHeading"
          v-text="$t('ecomV2App.image.home.createOrEditLabel')"
        >
          Create or edit a Image
        </h2>
        <div>
          <div class="form-group" v-if="image.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="image.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('ecomV2App.image.lienImage')" for="image-lienImage">Lien Image</label>
            <input
              type="text"
              class="form-control"
              name="lienImage"
              id="image-lienImage"
              data-cy="lienImage"
              :class="{ valid: !$v.image.lienImage.$invalid, invalid: $v.image.lienImage.$invalid }"
              v-model="$v.image.lienImage.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('ecomV2App.image.caracteristique')" for="image-caracteristique"
              >Caracteristique</label
            >
            <select
              class="form-control"
              id="image-caracteristique"
              data-cy="caracteristique"
              name="caracteristique"
              v-model="image.caracteristique"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  image.caracteristique && caracteristiqueOption.id === image.caracteristique.id
                    ? image.caracteristique
                    : caracteristiqueOption
                "
                v-for="caracteristiqueOption in caracteristiques"
                :key="caracteristiqueOption.id"
              >
                {{ caracteristiqueOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('ecomV2App.image.produit')" for="image-produit">Produit</label>
            <select class="form-control" id="image-produit" data-cy="produit" name="produit" v-model="image.produit">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="image.produit && produitOption.id === image.produit.id ? image.produit : produitOption"
                v-for="produitOption in produits"
                :key="produitOption.id"
              >
                {{ produitOption.id }}
              </option>
            </select>
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
            :disabled="$v.image.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./image-update.component.ts"></script>
