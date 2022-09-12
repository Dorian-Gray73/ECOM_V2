/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ProduitUpdateComponent from '@/entities/produit/produit-update.vue';
import ProduitClass from '@/entities/produit/produit-update.component';
import ProduitService from '@/entities/produit/produit.service';

import CaracteristiqueService from '@/entities/caracteristique/caracteristique.service';

import ImageService from '@/entities/image/image.service';

import ModeleService from '@/entities/modele/modele.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.use(ToastPlugin);
localVue.component('font-awesome-icon', {});
localVue.component('b-input-group', {});
localVue.component('b-input-group-prepend', {});
localVue.component('b-form-datepicker', {});
localVue.component('b-form-input', {});

describe('Component Tests', () => {
  describe('Produit Management Update Component', () => {
    let wrapper: Wrapper<ProduitClass>;
    let comp: ProduitClass;
    let produitServiceStub: SinonStubbedInstance<ProduitService>;

    beforeEach(() => {
      produitServiceStub = sinon.createStubInstance<ProduitService>(ProduitService);

      wrapper = shallowMount<ProduitClass>(ProduitUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          produitService: () => produitServiceStub,
          alertService: () => new AlertService(),

          caracteristiqueService: () =>
            sinon.createStubInstance<CaracteristiqueService>(CaracteristiqueService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          imageService: () =>
            sinon.createStubInstance<ImageService>(ImageService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          modeleService: () =>
            sinon.createStubInstance<ModeleService>(ModeleService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.produit = entity;
        produitServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(produitServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.produit = entity;
        produitServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(produitServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundProduit = { id: 123 };
        produitServiceStub.find.resolves(foundProduit);
        produitServiceStub.retrieve.resolves([foundProduit]);

        // WHEN
        comp.beforeRouteEnter({ params: { produitId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.produit).toBe(foundProduit);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});
