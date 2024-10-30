<template>
    <div class="h-screen overflow-hidden">
        <listNota :list-nota="listNota" :detail-nota="dataNota" :total-price="totalPrice" :diskon="disc" @detail-trans="detailNota"/>
        <navigasi />
    </div>
</template>
<script>
import navigasi from './template/Navigasi.vue'
import listNota from './content/DaftarTransaksi.vue'
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return { 
            
        }
    },
    computed: {
        ...mapGetters(['listNota', 'dataNota', 'totalPrice', 'disc'])
    },
    async mounted() {
        await this.fetchListNota()
    },
    methods: {
        ...mapActions(['fetchListNota', 'fetchNota']),
        detailNota(idTrans, diskon) {
            this.fetchNota({ id_transaksi: idTrans, disc: diskon })
        }
    },
    components: {
        navigasi,
        listNota
    }
}
</script>