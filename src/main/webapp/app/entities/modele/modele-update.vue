<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="ecomV2App.modele.home.createOrEditLabel"
          data-cy="ModeleCreateUpdateHeading"
          v-text="$t('ecomV2App.modele.home.createOrEditLabel')"
        >
          Create or edit a Modele
        </h2>
        <div>
          <div class="form-group" v-if="modele.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="modele.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('ecomV2App.modele.modele')" for="modele-modele">Modele</label>
            <input
              type="text"
              class="form-control"
              name="modele"
              id="modele-modele"
              data-cy="modele"
              :class="{ valid: !$v.modele.modele.$invalid, invalid: $v.modele.modele.$invalid }"
              v-model="$v.modele.modele.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('ecomV2App.modele.produit')" for="modele-produit">Produit</label>
            <select class="form-control" id="modele-produit" data-cy="produit" name="produit" v-model="modele.produit">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="modele.produit && produitOption.id === modele.produit.id ? modele.produit : produitOption"
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
            :disabled="$v.modele.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./modele-update.component.ts"></script>
