<template>
  <div class="h-screen overflow-hidden">
    <nota :data-nota="dataNota" :id-transaksi="idTransaksi" :total-price="totalPrice" @submit-transaksi="submitTransaksi" @update-nota="changeNota" @apply-disc="applyDisc"/>
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
    ...mapGetters(['filterMenu', 'dataNota', 'idTransaksi', 'totalPrice', 'disc']) 
  },
  async mounted() {
    await this.fetchMenu(),
    await this.generateIdTransaksi(),
    await this.fetchNota({ id_transaksi: this.idTransaksi, disc: this.disc })
  },
  methods: {
    ...mapActions(['fetchMenu', 'fetchNota','searchQuery','generateIdTransaksi',
    'storeNota', 'storeTransaksi', 'updateNota']),
    cariMenu(query) {
      this.searchQuery(query)
    },
    async addToNota(idMenu) {
      this.storeNota({ id_transaksi: this.idTransaksi, id_menu: idMenu })
    },
    async submitTransaksi(nama, diskon) {
      await this.storeTransaksi({ id_transaksi: this.idTransaksi, nama: nama, total_harga: this.totalPrice, diskon})
      await this.generateIdTransaksi()
      await this.fetchNota({ id_transaksi: this.idTransaksi, disc: this.disc })
    },
    async changeNota(idTran, idMenu, jumlah) {
      this.updateNota({ id_transaksi: idTran, id_menu: idMenu, jumlah: jumlah })      
    },
    async applyDisc(diskon) {
      this.fetchNota({ id_transaksi: this.idTransaksi, disc: diskon })
    }
  },
  components: {
    nota,
    daftarMenu,
    navigasi
  }
}
</script>