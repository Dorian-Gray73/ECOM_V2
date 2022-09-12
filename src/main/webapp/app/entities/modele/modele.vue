<template>
  <div>
    <h2 id="page-heading" data-cy="ModeleHeading">
      <span v-text="$t('ecomV2App.modele.home.title')" id="modele-heading">Modeles</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('ecomV2App.modele.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'ModeleCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-modele"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('ecomV2App.modele.home.createLabel')"> Create a new Modele </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && modeles && modeles.length === 0">
      <span v-text="$t('ecomV2App.modele.home.notFound')">No modeles found</span>
    </div>
    <div class="table-responsive" v-if="modeles && modeles.length > 0">
      <table class="table table-striped" aria-describedby="modeles">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('ecomV2App.modele.modele')">Modele</span></th>
            <th scope="row"><span v-text="$t('ecomV2App.modele.produit')">Produit</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="modele in modeles" :key="modele.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ModeleView', params: { modeleId: modele.id } }">{{ modele.id }}</router-link>
            </td>
            <td>{{ modele.modele }}</td>
            <td>
              <div v-if="modele.produit">
                <router-link :to="{ name: 'ProduitView', params: { produitId: modele.produit.id } }">{{ modele.produit.id }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'ModeleView', params: { modeleId: modele.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'ModeleEdit', params: { modeleId: modele.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(modele)"
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
        ><span id="ecomV2App.modele.delete.question" data-cy="modeleDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-modele-heading" v-text="$t('ecomV2App.modele.delete.question', { id: removeId })">
          Are you sure you want to delete this Modele?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-modele"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeModele()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./modele.component.ts"></script>
