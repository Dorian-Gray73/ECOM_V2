import Vue from 'vue';
import Component from 'vue-class-component';
import Navbar from '@/core/navbar/navbar.vue';

import '@/shared/config/dayjs';
import Footer from '@/core/footer/footer.vue';

@Component({
  components: {
    navbar: Navbar,
    footerComponent: Footer,
  },
})
export default class App extends Vue {}
