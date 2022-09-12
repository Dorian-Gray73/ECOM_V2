/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ProduitComponent from '@/entities/produit/produit.vue';
import ProduitClass from '@/entities/produit/produit.component';
import ProduitService from '@/entities/produit/produit.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(ToastPlugin);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('Produit Management Component', () => {
    let wrapper: Wrapper<ProduitClass>;
    let comp: ProduitClass;
    let produitServiceStub: SinonStubbedInstance<ProduitService>;

    beforeEach(() => {
      produitServiceStub = sinon.createStubInstance<ProduitService>(ProduitService);
      produitServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ProduitClass>(ProduitComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          produitService: () => produitServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      produitServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllProduits();
      await comp.$nextTick();

      // THEN
      expect(produitServiceStub.retrieve.called).toBeTruthy();
      expect(comp.produits[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      produitServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(produitServiceStub.retrieve.callCount).toEqual(1);

      comp.removeProduit();
      await comp.$nextTick();

      // THEN
      expect(produitServiceStub.delete.called).toBeTruthy();
      expect(produitServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
