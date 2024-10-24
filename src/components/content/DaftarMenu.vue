<template>
    <div class="w-screen h-[1.5cm] bg-red-600 text-white flex justify-between px-[20px]">
        <p class="text-[30px] my-auto">Menu</p>
        <div class="flex gap-[10px] my-auto">
            <input v-model="searchQuery" placeholder="Cari menu" class="text-black rounded-md p-[5px]" />
            <button @click="cari" class="bg-green-500 border-none rounded-md px-[5px] hover:bg-green-300 ">Cari Menu</button>
        </div>
    </div>
    <div class="h-[7.5cm] p-[10px] gap-[10px] overflow-auto">
        <div class="grid w-full grid-cols-3 gap-[10px]">
            <button @click="addNota(data.id)" v-for="(data, index) in filteredMenu" :key="index" class="p-[10px] border border-red-600 rounded-md
                         flex justify-between min-h-[1cm] max-h-[1cm] hover:bg-red-300 items-center">
                <p>{{ data.nama }}</p>
                <p>@{{ data.harga }}</p>
            </button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        menu: '',
        filteredMenu: '',
    },
    data() {
        return {
            searchQuery: ''
        }
    },
    methods: {
        formatNumber(value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        cari() {
            this.$emit('cariMenu', this.searchQuery)
        },
        addNota(idMenu) {
            this.$emit('addToNota', idMenu)
        }
    },
    emits: ['cariMenu', 'addToNota']
}
</script>