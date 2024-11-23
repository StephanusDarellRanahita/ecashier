<template>
  <div class="h-screen overflow-hidden">
    <nota :data-nota="dataNota" :id-transaksi="idTransaksi" :total-price="totalPrice" @submit-transaksi="submitTransaksi" @update-nota="changeNota" @apply-disc="applyDisc"/>
    <daftarMenu :filtered-menu="filterMenu" @cari-menu="cariMenu" @add-to-nota="addToNota"/>
    <navigasi :list-menu="menu" @submit-menu="submitMenu" @submit-edit-menu="changeMenu" />
  </div>
</template>
<script>
import nota from './content/DaftarNota.vue'
import daftarMenu from './content/DaftarMenu.vue'
import navigasi from './template/Navigasi.vue'

import { mapActions, mapGetters } from 'vuex' 
export default {
  computed: {
    ...mapGetters(['menu', 'filterMenu', 'dataNota', 'idTransaksi', 'totalPrice', 'disc']) 
  },
  async mounted() {
    await this.fetchMenu(),
    await this.generateIdTransaksi(),
    await this.fetchNota({ id_transaksi: this.idTransaksi, disc: this.disc })
  },
  methods: {
    ...mapActions(['fetchMenu', 'fetchNota','searchQuery','generateIdTransaksi',
    'storeNota', 'storeTransaksi', 'updateNota', 'updateMenu', 'storeMenu']),
    cariMenu(query) {
      this.searchQuery(query)
    },
    async addToNota(idMenu) {
      await this.storeNota({ id_transaksi: this.idTransaksi, id_menu: idMenu, disc: this.disc })
    },
    async submitTransaksi(nama, diskon) {
      await this.storeTransaksi({ id_transaksi: this.idTransaksi, nama: nama, total_harga: this.totalPrice, diskon})
      await this.generateIdTransaksi()
      await this.fetchNota({ id_transaksi: this.idTransaksi, disc: this.disc })
    },
    async submitMenu(nama, harga) {
      await this.storeMenu({ nama: nama, harga: harga })      
    },
    async changeNota(idTran, idMenu, jumlah) {
      await this.updateNota({ id_transaksi: idTran, id_menu: idMenu, jumlah: jumlah, disc: this.disc })      
    },
    async changeMenu(idMenu, nama, harga) {
      console.log('ID MENU: ' + idMenu)
      await this.updateMenu({ id: idMenu, nama: nama, harga: harga })
    },
    async applyDisc(diskon) {
      await this.fetchNota({ id_transaksi: this.idTransaksi, disc: diskon })
    }
  },
  components: {
    nota,
    daftarMenu,
    navigasi
  }
}
</script>