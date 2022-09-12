/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import ProduitDetailComponent from '@/entities/produit/produit-details.vue';
import ProduitClass from '@/entities/produit/produit-details.component';
import ProduitService from '@/entities/produit/produit.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Produit Management Detail Component', () => {
    let wrapper: Wrapper<ProduitClass>;
    let comp: ProduitClass;
    let produitServiceStub: SinonStubbedInstance<ProduitService>;

    beforeEach(() => {
      produitServiceStub = sinon.createStubInstance<ProduitService>(ProduitService);

      wrapper = shallowMount<ProduitClass>(ProduitDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { produitService: () => produitServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundProduit = { id: 123 };
        produitServiceStub.find.resolves(foundProduit);

        // WHEN
        comp.retrieveProduit(123);
        await comp.$nextTick();

        // THEN
        expect(comp.produit).toBe(foundProduit);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundProduit = { id: 123 };
        produitServiceStub.find.resolves(foundProduit);

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
