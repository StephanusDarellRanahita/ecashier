<template>
    <div class="w-screen h-[1.5cm] bg-red-600 text-white flex justify-between px-[20px]">
        <p class="text-[30px] my-auto">List Nota</p>
    </div>
    <div class="h-[16.5cm] p-[10px]">
        <p class="my-auto font-bold text-red-600 text-[30px] mb-[10px]">PENDING</p>
        <div class="flex gap-[10px] w-full overflow-auto">
            <div v-for="(data, index) in listDiskon" :key="index"
                class="border-2 border-red-600 rounded-md h-[5cm] flex flex-col min-w-[5cm] p-[5px]">
                <p class="my-auto">ID: {{ data.id_transaksi }}</p>
                <p class="my-auto">Diskon: {{ data.diskon }} %</p>
                <p class="my-auto">Total: Rp {{ formatNumber(data.total_harga) }}</p>
                <p class="my-auto">Nama: {{ data.nama }}</p>
                <p class="text-center mt-[10px] my-auto"
                    :class="data.status == 'pending' ? ['text-red-600', 'font-bold'] : ''">[{{ upperCase(data.status) }}]
                </p>
                <button @click="detail(data.id_transaksi, data.diskon)"
                    class="bg-green-500 border-none p-[5px] rounded-md w-fit mx-auto text-white mt-[5px]">PRINT</button>
            </div>
        </div>
    </div>
    <a-modal v-model:open="modal" title="Detail Transaksi">
        <template #footer>
            <button @click="print" class="px-4 py-2 text-white bg-blue-500 rounded-md print:hidden">PRINT</button>
        </template>
        <p v-if="detailNota.length > 0">{{ detailNota[0].id_transaksi }}</p>
        <p>{{ new Date().toLocaleDateString() }} {{ new Date().toLocaleTimeString() }}</p>
        <div class="flex justify-between border-b-[2px] border-gray-400 border-dashed mb-[10px]">
            <div class="flex justify-between w-full">
                <p class="my-auto">Menu</p>
                <p class="my-auto">Jumlah</p>
            </div>
            <p class="w-[110px] md:w-[200px] my-auto text-center">Harga</p>
        </div>
        <div v-for="(data, index) in detailNota" :key="index" class="flex justify-between gap-[30px]">
            <div class="flex justify-between w-full">
                <p>{{ data.menu.nama }}</p>
                <p>{{ data.jumlah }}</p>
            </div>
            <p class="w-[5cm] text-first">Rp {{ formatNumber(data.harga) }}</p>
        </div>
        <div class="flex justify-between border-t-[2px] border-dashed border-gray-400">
            <p>Diskon :</p>
            <p class="text-first w-[127px]">{{ diskon }} %</p>
        </div>
        <div class="flex justify-between gap-[30px]">
            <p>Total :</p>
            <p class="text-first w-[127px]">Rp {{ formatNumber(totalPrice) }}</p>
        </div>
    </a-modal>
</template>
<script>
import { ref } from 'vue'

export default {
    props: {
        listNota: '',
        detailNota: '',
        totalPrice: 0,
        diskon: ''
    },
    data() {
        return {
            modal: false
        }
    },
    computed: {
        listDiskon() {
            return this.listNota.filter(data => data.status == 'pending')
        },
    },
    methods: {
        formatNumber(value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        upperCase(value) {
            return value.toUpperCase()
        },
        detail(idTrans, diskon) {
            this.modal = true
            this.$emit('detailTrans', idTrans, diskon)
        },
        print() {
            window.print()
        }
    },
    emits: ['detailTrans']
}
</script>