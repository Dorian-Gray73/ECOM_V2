/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import CaracteristiqueDetailComponent from '@/entities/caracteristique/caracteristique-details.vue';
import CaracteristiqueClass from '@/entities/caracteristique/caracteristique-details.component';
import CaracteristiqueService from '@/entities/caracteristique/caracteristique.service';
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
  describe('Caracteristique Management Detail Component', () => {
    let wrapper: Wrapper<CaracteristiqueClass>;
    let comp: CaracteristiqueClass;
    let caracteristiqueServiceStub: SinonStubbedInstance<CaracteristiqueService>;

    beforeEach(() => {
      caracteristiqueServiceStub = sinon.createStubInstance<CaracteristiqueService>(CaracteristiqueService);

      wrapper = shallowMount<CaracteristiqueClass>(CaracteristiqueDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { caracteristiqueService: () => caracteristiqueServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundCaracteristique = { id: 123 };
        caracteristiqueServiceStub.find.resolves(foundCaracteristique);

        // WHEN
        comp.retrieveCaracteristique(123);
        await comp.$nextTick();

        // THEN
        expect(comp.caracteristique).toBe(foundCaracteristique);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundCaracteristique = { id: 123 };
        caracteristiqueServiceStub.find.resolves(foundCaracteristique);

        // WHEN
        comp.beforeRouteEnter({ params: { caracteristiqueId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.caracteristique).toBe(foundCaracteristique);
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
