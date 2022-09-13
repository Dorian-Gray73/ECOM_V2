import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Recherche extends Vue {
  data() {
    return {
      selected: [], // Must be an array reference!
      rows: 100,
      currentPage: 1,
      options: [
        { text: 'Orange', value: 'orange' },
        { text: 'Apple', value: 'apple' },
        { text: 'Pineapple', value: 'pineapple' },
        { text: 'Grape', value: 'grape' },
      ],
    };
  }
}
