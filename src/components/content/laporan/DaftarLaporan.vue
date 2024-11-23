<template>
    <div class="w-screen h-[1.5cm] bg-red-600 text-white flex justify-between px-[20px] print:hidden">
        <p class="text-[30px] my-auto">Laporan</p>
    </div>
    <div class="h-[16.5cm] p-[10px]">
        <div class="flex justify-between border-2 w-[50%] h-[1cm] border-red-600 bg-red-300 font-bold">
            <div class="flex justify-center w-full border-r-2 border-red-600"><p class="my-auto text-[18px]">Tanggal</p></div>
            <div class="flex justify-center w-full"><p class="my-auto text-[18px]">Total</p></div>
        </div>
        <div v-for="(data,index) in listLapHari" :key="index" class="flex justify-between border-x-2 border-b-2 w-[50%] h-[1cm] border-red-600">
            <div class="flex justify-center w-full border-r-2 border-red-600"><p class="my-auto text-[18px]">{{ formatDate(data.tanggal) }}</p></div>
            <div class="flex justify-center w-full"><p class="my-auto text-[18px]">Rp {{ formatNumber(data.total) }}</p></div>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
import 'moment/locale/id'

moment.locale('id')

export default {
    props: {
        listLapHari: ''
    },
    mounted() {
        console.log('LIST: ' + this.listLapHari)
    },
    methods: {
        formatNumber(value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        formatDate(date) {
            return moment(date).format('DD MMMM YYYY')
        }
    },
}
</script>