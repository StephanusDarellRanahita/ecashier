<template>
  <div class="h-screen overflow-hidden">
    <nota :data-nota="dataNota" :id-transaksi="idTransaksi" :total-price="totalPrice"/>
    <daftarMenu :filtered-menu="filterMenu" @cari-menu="cariMenu" @add-to-nota="addToNota"/>
    <navigasi />
  </div>
</template>
<script>
import nota from './content/DaftarNota.vue'
import daftarMenu from './content/DaftarMenu.vue'
import navigasi from './template/Navigasi.vue'

import { mapActions, mapGetters } from 'vuex' 
export default {
  computed: {
    ...mapGetters(['filterMenu', 'dataNota', 'idTransaksi', 'totalPrice']) 
  },
  async mounted() {
    await this.fetchMenu(),
    await this.generateIdTransaksi(),
    await this.fetchNota({ id_transaksi: this.idTransaksi })
  },
  methods: {
    ...mapActions(['fetchMenu', 'fetchNota','searchQuery','generateIdTransaksi',
    'storeNota']),
    cariMenu(query) {
      this.searchQuery(query)
    },
    async addToNota(idMenu) {
      this.storeNota({ id_transaksi: this.idTransaksi, id_menu: idMenu })
    }
  },
  components: {
    nota,
    daftarMenu,
    navigasi
  }
}
</script>