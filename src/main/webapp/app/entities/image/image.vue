<template>
  <div>
    <h2 id="page-heading" data-cy="ImageHeading">
      <span v-text="$t('ecomApp.image.home.title')" id="image-heading">Images</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('ecomApp.image.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'ImageCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-image"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('ecomApp.image.home.createLabel')"> Create a new Image </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && images && images.length === 0">
      <span v-text="$t('ecomApp.image.home.notFound')">No images found</span>
    </div>
    <div class="table-responsive" v-if="images && images.length > 0">
      <table class="table table-striped" aria-describedby="images">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('ecomApp.image.lienImage')">Lien Image</span></th>
            <th scope="row"><span v-text="$t('ecomApp.image.caracteristique')">Caracteristique</span></th>
            <th scope="row"><span v-text="$t('ecomApp.image.produit')">Produit</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="image in images" :key="image.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ImageView', params: { imageId: image.id } }">{{ image.id }}</router-link>
            </td>
            <td>{{ image.lienImage }}</td>
            <td>
              <div v-if="image.caracteristique">
                <router-link :to="{ name: 'CaracteristiqueView', params: { caracteristiqueId: image.caracteristique.id } }">{{
                  image.caracteristique.id
                }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="image.produit">
                <router-link :to="{ name: 'ProduitView', params: { produitId: image.produit.id } }">{{ image.produit.id }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'ImageView', params: { imageId: image.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'ImageEdit', params: { imageId: image.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(image)"
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
        ><span id="ecomApp.image.delete.question" data-cy="imageDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-image-heading" v-text="$t('ecomApp.image.delete.question', { id: removeId })">
          Are you sure you want to delete this Image?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-image"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeImage()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./image.component.ts"></script>
