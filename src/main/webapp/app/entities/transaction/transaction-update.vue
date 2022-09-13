<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="ecomApp.transaction.home.createOrEditLabel"
          data-cy="TransactionCreateUpdateHeading"
          v-text="$t('ecomApp.transaction.home.createOrEditLabel')"
        >
          Create or edit a Transaction
        </h2>
        <div>
          <div class="form-group" v-if="transaction.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="transaction.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('ecomApp.transaction.etat')" for="transaction-etat">Etat</label>
            <select
              class="form-control"
              name="etat"
              :class="{ valid: !$v.transaction.etat.$invalid, invalid: $v.transaction.etat.$invalid }"
              v-model="$v.transaction.etat.$model"
              id="transaction-etat"
              data-cy="etat"
            >
              <option
                v-for="etatProduit in etatProduitValues"
                :key="etatProduit"
                v-bind:value="etatProduit"
                v-bind:label="$t('ecomApp.EtatProduit.' + etatProduit)"
              >
                {{ etatProduit }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('ecomApp.transaction.date')" for="transaction-date">Date</label>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="transaction-date"
                  v-model="$v.transaction.date.$model"
                  name="date"
                  class="form-control"
                  :locale="currentLanguage"
                  button-only
                  today-button
                  reset-button
                  close-button
                >
                </b-form-datepicker>
              </b-input-group-prepend>
              <b-form-input
                id="transaction-date"
                data-cy="date"
                type="text"
                class="form-control"
                name="date"
                :class="{ valid: !$v.transaction.date.$invalid, invalid: $v.transaction.date.$invalid }"
                v-model="$v.transaction.date.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('ecomApp.transaction.utilisateur')" for="transaction-utilisateur"
              >Utilisateur</label
            >
            <select
              class="form-control"
              id="transaction-utilisateur"
              data-cy="utilisateur"
              name="utilisateur"
              v-model="transaction.utilisateur"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  transaction.utilisateur && utilisateurOption.id === transaction.utilisateur.id
                    ? transaction.utilisateur
                    : utilisateurOption
                "
                v-for="utilisateurOption in utilisateurs"
                :key="utilisateurOption.id"
              >
                {{ utilisateurOption.id }}
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
            :disabled="$v.transaction.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./transaction-update.component.ts"></script>
