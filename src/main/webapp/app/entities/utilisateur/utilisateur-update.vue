<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="ecomApp.utilisateur.home.createOrEditLabel"
          data-cy="UtilisateurCreateUpdateHeading"
          v-text="$t('ecomApp.utilisateur.home.createOrEditLabel')"
        >
          Create or edit a Utilisateur
        </h2>
        <div>
          <div class="form-group" v-if="utilisateur.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="utilisateur.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('ecomApp.utilisateur.nom')" for="utilisateur-nom">Nom</label>
            <input
              type="text"
              class="form-control"
              name="nom"
              id="utilisateur-nom"
              data-cy="nom"
              :class="{ valid: !$v.utilisateur.nom.$invalid, invalid: $v.utilisateur.nom.$invalid }"
              v-model="$v.utilisateur.nom.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('ecomApp.utilisateur.prenom')" for="utilisateur-prenom">Prenom</label>
            <input
              type="text"
              class="form-control"
              name="prenom"
              id="utilisateur-prenom"
              data-cy="prenom"
              :class="{ valid: !$v.utilisateur.prenom.$invalid, invalid: $v.utilisateur.prenom.$invalid }"
              v-model="$v.utilisateur.prenom.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('ecomApp.utilisateur.courriel')" for="utilisateur-courriel">Courriel</label>
            <input
              type="text"
              class="form-control"
              name="courriel"
              id="utilisateur-courriel"
              data-cy="courriel"
              :class="{ valid: !$v.utilisateur.courriel.$invalid, invalid: $v.utilisateur.courriel.$invalid }"
              v-model="$v.utilisateur.courriel.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('ecomApp.utilisateur.adresse')" for="utilisateur-adresse">Adresse</label>
            <input
              type="text"
              class="form-control"
              name="adresse"
              id="utilisateur-adresse"
              data-cy="adresse"
              :class="{ valid: !$v.utilisateur.adresse.$invalid, invalid: $v.utilisateur.adresse.$invalid }"
              v-model="$v.utilisateur.adresse.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('ecomApp.utilisateur.type')" for="utilisateur-type">Type</label>
            <select
              class="form-control"
              name="type"
              :class="{ valid: !$v.utilisateur.type.$invalid, invalid: $v.utilisateur.type.$invalid }"
              v-model="$v.utilisateur.type.$model"
              id="utilisateur-type"
              data-cy="type"
            >
              <option v-for="type in typeValues" :key="type" v-bind:value="type" v-bind:label="$t('ecomApp.Type.' + type)">
                {{ type }}
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
            :disabled="$v.utilisateur.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./utilisateur-update.component.ts"></script>
