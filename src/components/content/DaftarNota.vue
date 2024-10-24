<template>
    <div class="w-screen h-[1.5cm] bg-red-600 text-white flex justify-between px-[20px]">
        <p class="text-[30px] my-auto">Nota</p>
        <p class="my-auto">ID Transaksi : {{ idTransaksi }}</p>
    </div>
    <div class="flex gap-[10px] text-[12px] md:text-[17px]">
        <div class="h-[7.5cm] p-[10px] border-r-2 border-red-600 w-[7cm] md:w-[19cm]">
            <div class="p-[10px] border border-red-600 bg-red-200 rounded-md flex justify-between mb-[10px]">
                <div class="flex justify-between w-full">
                    <p>Menu</p>
                    <p>Jumlah</p>
                </div>
                <p class="w-[110px] md:w-[5cm] text-center">Harga</p>
            </div>
            <div class="overflow-auto h-[5.5cm]">
                <div v-for="(data, index) in dataNota" :key="index"
                    class="p-[10px] border border-red-600 rounded-md flex mb-[5px] justify-between">
                    <div class="flex md:gap-[200px] justify-between w-full">
                        <p>{{ data.menu.nama }}</p>
                        <input class="border border-red-600 w-[30px] md:w-[40px] md:px-[5px] text-center" v-model="data.jumlah" />
                    </div>
                    <p class="w-[3cm] md:w-[5cm] text-center">Rp {{ formatNumber(data.harga) }},00</p>
                </div>
            </div>
        </div>
        <div class="flex flex-col justify-between pb-[20px] pt-[6px]">
            <div class="flex flex-col gap-[10px]">
                <p>Nama Customer</p>
                <input v-model="nama" class="border p-[5px] border-red-600 rounded-md w-full" placeholder="Nama customer" />
                <p>Total Harga : Rp {{ formatNumber(totalPrice) }}</p>
            </div>
            <button class="p-[5px] rounded-md bg-green-500 border-none text-white w-fit">Simpan</button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        dataNota: '',
        idTransaksi: '',
        totalPrice: 0
    },
    data() {
        return {
            nama: ''
        }
    },
    mounted() {
    },
    methods: {
        formatNumber(value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }
    }
}
</script>