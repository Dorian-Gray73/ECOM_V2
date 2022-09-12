<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="ecomV2App.caracteristique.home.createOrEditLabel"
          data-cy="CaracteristiqueCreateUpdateHeading"
          v-text="$t('ecomV2App.caracteristique.home.createOrEditLabel')"
        >
          Create or edit a Caracteristique
        </h2>
        <div>
          <div class="form-group" v-if="caracteristique.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="caracteristique.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('ecomV2App.caracteristique.couleur')" for="caracteristique-couleur">Couleur</label>
            <input
              type="text"
              class="form-control"
              name="couleur"
              id="caracteristique-couleur"
              data-cy="couleur"
              :class="{ valid: !$v.caracteristique.couleur.$invalid, invalid: $v.caracteristique.couleur.$invalid }"
              v-model="$v.caracteristique.couleur.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('ecomV2App.caracteristique.couleurHexa')" for="caracteristique-couleurHexa"
              >Couleur Hexa</label
            >
            <input
              type="text"
              class="form-control"
              name="couleurHexa"
              id="caracteristique-couleurHexa"
              data-cy="couleurHexa"
              :class="{ valid: !$v.caracteristique.couleurHexa.$invalid, invalid: $v.caracteristique.couleurHexa.$invalid }"
              v-model="$v.caracteristique.couleurHexa.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('ecomV2App.caracteristique.quantite')" for="caracteristique-quantite"
              >Quantite</label
            >
            <input
              type="number"
              class="form-control"
              name="quantite"
              id="caracteristique-quantite"
              data-cy="quantite"
              :class="{ valid: !$v.caracteristique.quantite.$invalid, invalid: $v.caracteristique.quantite.$invalid }"
              v-model.number="$v.caracteristique.quantite.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('ecomV2App.caracteristique.lienImage')" for="caracteristique-lienImage"
              >Lien Image</label
            >
            <input
              type="text"
              class="form-control"
              name="lienImage"
              id="caracteristique-lienImage"
              data-cy="lienImage"
              :class="{ valid: !$v.caracteristique.lienImage.$invalid, invalid: $v.caracteristique.lienImage.$invalid }"
              v-model="$v.caracteristique.lienImage.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('ecomV2App.caracteristique.ligneTransaction')"
              for="caracteristique-ligneTransaction"
              >Ligne Transaction</label
            >
            <select
              class="form-control"
              id="caracteristique-ligneTransaction"
              data-cy="ligneTransaction"
              name="ligneTransaction"
              v-model="caracteristique.ligneTransaction"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  caracteristique.ligneTransaction && ligneTransactionOption.id === caracteristique.ligneTransaction.id
                    ? caracteristique.ligneTransaction
                    : ligneTransactionOption
                "
                v-for="ligneTransactionOption in ligneTransactions"
                :key="ligneTransactionOption.id"
              >
                {{ ligneTransactionOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('ecomV2App.caracteristique.produit')" for="caracteristique-produit">Produit</label>
            <select class="form-control" id="caracteristique-produit" data-cy="produit" name="produit" v-model="caracteristique.produit">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  caracteristique.produit && produitOption.id === caracteristique.produit.id ? caracteristique.produit : produitOption
                "
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
            :disabled="$v.caracteristique.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./caracteristique-update.component.ts"></script>
