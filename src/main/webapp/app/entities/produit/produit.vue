<template>
  <div>
    <h2 id="page-heading" data-cy="ProduitHeading">
      <span v-text="$t('ecomV2App.produit.home.title')" id="produit-heading">Produits</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('ecomV2App.produit.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'ProduitCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-produit"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('ecomV2App.produit.home.createLabel')"> Create a new Produit </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && produits && produits.length === 0">
      <span v-text="$t('ecomV2App.produit.home.notFound')">No produits found</span>
    </div>
    <div class="table-responsive" v-if="produits && produits.length > 0">
      <table class="table table-striped" aria-describedby="produits">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('ecomV2App.produit.nom')">Nom</span></th>
            <th scope="row"><span v-text="$t('ecomV2App.produit.prix')">Prix</span></th>
            <th scope="row"><span v-text="$t('ecomV2App.produit.marque')">Marque</span></th>
            <th scope="row"><span v-text="$t('ecomV2App.produit.progressif')">Progressif</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="produit in produits" :key="produit.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ProduitView', params: { produitId: produit.id } }">{{ produit.id }}</router-link>
            </td>
            <td>{{ produit.nom }}</td>
            <td>{{ produit.prix }}</td>
            <td>{{ produit.marque }}</td>
            <td>{{ produit.progressif }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'ProduitView', params: { produitId: produit.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'ProduitEdit', params: { produitId: produit.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(produit)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="ecomV2App.produit.delete.question" data-cy="produitDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-produit-heading" v-text="$t('ecomV2App.produit.delete.question', { id: removeId })">
          Are you sure you want to delete this Produit?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-produit"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeProduit()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./produit.component.ts"></script>
