/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ModeleUpdateComponent from '@/entities/modele/modele-update.vue';
import ModeleClass from '@/entities/modele/modele-update.component';
import ModeleService from '@/entities/modele/modele.service';

import ProduitService from '@/entities/produit/produit.service';
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
  describe('Modele Management Update Component', () => {
    let wrapper: Wrapper<ModeleClass>;
    let comp: ModeleClass;
    let modeleServiceStub: SinonStubbedInstance<ModeleService>;

    beforeEach(() => {
      modeleServiceStub = sinon.createStubInstance<ModeleService>(ModeleService);

      wrapper = shallowMount<ModeleClass>(ModeleUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          modeleService: () => modeleServiceStub,
          alertService: () => new AlertService(),

          produitService: () =>
            sinon.createStubInstance<ProduitService>(ProduitService, {
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
        comp.modele = entity;
        modeleServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(modeleServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.modele = entity;
        modeleServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(modeleServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundModele = { id: 123 };
        modeleServiceStub.find.resolves(foundModele);
        modeleServiceStub.retrieve.resolves([foundModele]);

        // WHEN
        comp.beforeRouteEnter({ params: { modeleId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.modele).toBe(foundModele);
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
