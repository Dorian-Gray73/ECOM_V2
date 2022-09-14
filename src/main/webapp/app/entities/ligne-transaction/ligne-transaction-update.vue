<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="ecomV2App.ligneTransaction.home.createOrEditLabel"
          data-cy="LigneTransactionCreateUpdateHeading"
          v-text="$t('ecomV2App.ligneTransaction.home.createOrEditLabel')"
        >
          Create or edit a LigneTransaction
        </h2>
        <div>
          <div class="form-group" v-if="ligneTransaction.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="ligneTransaction.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('ecomV2App.ligneTransaction.quantite')" for="ligne-transaction-quantite"
              >Quantite</label
            >
            <input
              type="number"
              class="form-control"
              name="quantite"
              id="ligne-transaction-quantite"
              data-cy="quantite"
              :class="{ valid: !$v.ligneTransaction.quantite.$invalid, invalid: $v.ligneTransaction.quantite.$invalid }"
              v-model.number="$v.ligneTransaction.quantite.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('ecomV2App.ligneTransaction.prixUnitaire')" for="ligne-transaction-prixUnitaire"
              >Prix Unitaire</label
            >
            <input
              type="number"
              class="form-control"
              name="prixUnitaire"
              id="ligne-transaction-prixUnitaire"
              data-cy="prixUnitaire"
              :class="{ valid: !$v.ligneTransaction.prixUnitaire.$invalid, invalid: $v.ligneTransaction.prixUnitaire.$invalid }"
              v-model.number="$v.ligneTransaction.prixUnitaire.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('ecomV2App.ligneTransaction.transaction')" for="ligne-transaction-transaction"
              >Transaction</label
            >
            <select
              class="form-control"
              id="ligne-transaction-transaction"
              data-cy="transaction"
              name="transaction"
              v-model="ligneTransaction.transaction"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  ligneTransaction.transaction && transactionOption.id === ligneTransaction.transaction.id
                    ? ligneTransaction.transaction
                    : transactionOption
                "
                v-for="transactionOption in transactions"
                :key="transactionOption.id"
              >
                {{ transactionOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('ecomV2App.ligneTransaction.caracteristique')"
              for="ligne-transaction-caracteristique"
              >Caracteristique</label
            >
            <select
              class="form-control"
              id="ligne-transaction-caracteristique"
              data-cy="caracteristique"
              name="caracteristique"
              v-model="ligneTransaction.caracteristique"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  ligneTransaction.caracteristique && caracteristiqueOption.id === ligneTransaction.caracteristique.id
                    ? ligneTransaction.caracteristique
                    : caracteristiqueOption
                "
                v-for="caracteristiqueOption in caracteristiques"
                :key="caracteristiqueOption.id"
              >
                {{ caracteristiqueOption.id }}
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
            :disabled="$v.ligneTransaction.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./ligne-transaction-update.component.ts"></script>
