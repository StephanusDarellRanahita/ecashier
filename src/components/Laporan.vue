<template>
    <laporan :list-lap-hari="laporanHari"/>
    <navigasi />
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import laporan from './content/laporan/DaftarLaporan.vue'
import navigasi from './template/Navigasi.vue'
export default {
    computed: {
        ...mapGetters(['laporanHari'])
    },
    async mounted() {
          await this.fetchLaporanHari() 
    },
    methods: {
        ...mapActions(['fetchLaporanHari'])
    },
    components: {
        laporan,
        navigasi
    }
}
</script>