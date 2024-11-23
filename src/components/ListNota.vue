<template>
    <div class="h-screen overflow-hidden">
        <listNota :list-nota="listNota" :detail-nota="dataNota" :total-price="totalPrice" :diskon="disc" @cancel-trans="cancel" @detail-trans="detailNota"/>
        <navigasi :list-menu="menu"/>
    </div>
</template>
<script>
import navigasi from './template/Navigasi.vue'
import listNota from './content/DaftarTransaksi.vue'
import { mapActions, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['menu', 'listNota', 'dataNota', 'totalPrice', 'disc', 'filterMenu'])
    },
    async mounted() {
        await this.fetchListNota()
        await this.fetchMenu()
    },
    methods: {
        ...mapActions(['fetchListNota', 'fetchNota', 'cancelTransaksi', 'fetchMenu']),
        detailNota(idTrans, diskon) {
            this.fetchNota({ id_transaksi: idTrans, disc: diskon })
        },
        cancel(id) {
            this.cancelTransaksi({ id: id })
        }
    },
    components: {
        navigasi,
        listNota
    }
}
</script>