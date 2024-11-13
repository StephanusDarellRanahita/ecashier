<template>
    <div class="w-screen h-[2.5cm] bg-red-600 text-white text-[20px] font-bold flex justify-between print:hidden">
        <div class="flex">
            <button @click="select(1)" class="flex items-center w-[4cm]" :class="menu == 1 ? 'bg-red-300' : ''">
                <p class="mx-auto my-auto">BERANDA</p>
            </button>
            <button @click="select(2)" class="flex items-center w-[4cm] border-x-2" :class="menu == 2 ? 'bg-red-300' : ''">
                <p class="mx-auto my-auto">NOTA</p>
            </button>
        </div>
        <div class="flex">
            <button @click="edit" class="flex items-center w-[4cm] p-[15px] hover:bg-red-300 border-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-[1cm] fill-green-300">
                    <title>pencil-circle</title>
                    <path
                        d="M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M15.1,7.07C15.24,7.07 15.38,7.12 15.5,7.23L16.77,8.5C17,8.72 17,9.07 16.77,9.28L15.77,10.28L13.72,8.23L14.72,7.23C14.82,7.12 14.96,7.07 15.1,7.07M13.13,8.81L15.19,10.87L9.13,16.93H7.07V14.87L13.13,8.81Z" />
                </svg>
                <p class="mx-auto my-auto">MENU</p>
            </button>
            <button @click="tambah" class="flex items-center w-[4cm] p-[15px] hover:bg-red-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-[1cm] fill-green-300">
                    <title>plus-box</title>
                    <path
                        d="M17,13H13V17H11V13H7V11H11V7H13V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
                </svg>
                <p class="mx-auto my-auto">MENU</p>
            </button>
        </div>
    </div>
    <a-modal v-model:open="addModal" title="Tambah Menu">
        <template #footer>
            <button @click="submitMenu" class="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-300">TAMBAH</button>
        </template>
        <p class="my-auto">Nama Menu</p>
        <input v-model="form.nama" class="border p-[5px] border-red-600 rounded-md" placeholder="Nama menu" />
        <p class="my-auto mt-[20px]">Harga</p>
        <input v-model="form.harga" class="border p-[5px] border-red-600 rounded-md" placeholder="Harga" />
        <p v-if="hargaHandler === true" class="my-auto text-red-600">Harga Tidak Boleh 0</p>
    </a-modal>
    <a-modal v-model:open="editModal" title="Edit Menu">
        <template #footer>
            <button @click="submitEditMenu" class="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-300"
                :class="selectedMenu === 0 ? ['disabled', 'bg-gray-300', 'text-gray-500'] : ''">UBAH</button>
        </template>
        <p class="my-auto">Pilih Menu</p>
        <div class="border-2 border-red-600 rounded-md w-fit">
            <select class="dropdown" v-model="selectedMenu" style="height: 30px; width: 5cm; border-radius: 5px;"
                @change="selectedData">
                <option v-for="(data, index) in listMenu" :key="index" :value="data.id" class="border-2">{{ data.nama }}
                </option>
            </select>
        </div>
        <div v-if="dataMenu" class="flex gap-[10px]">
            <div>
                <p class="my-auto mt-[10px]">Nama Menu</p>
                <input class="border-2 border-red-600 rounded-md h-[30px] p-[5px]" v-model="dataMenu[0].nama" />
            </div>
            <div>
                <p class="my-auto mt-[10px]">Harga</p>
                <input class="border-2 border-red-600 rounded-md h-[30px] p-[5px]" v-model="dataMenu[0].harga" />
            </div>
        </div>
    </a-modal>
</template>
<script>
export default {
    props: {
        listMenu: ''
    },
    data() {
        return {
            menu: 1,
            addModal: false,
            editModal: false,
            form: {
                nama: '',
                harga: 0
            },
            hargaHandler: false,
            selectedMenu: 0,
            dataMenu: ''
        }
    },
    watch: {
        addModal(value) {
            if (!value) {
                this.hargaHandler = false
            }
        },
        editModal(value) {
            if (!value) {
                this.selectedMenu = 0
                this.dataMenu = ''
            }
        }
    },
    created() {
        if (this.$route.path === '/nota') {
            this.menu = 2
        } else {
            this.menu = 1
        }
    },
    methods: {
        select(menu) {
            this.menu = menu
            if (menu == 1)
                this.$router.push('/')
            else
                this.$router.push('/nota')
        },
        selectedData() {
            console.log(this.selectedMenu)
            this.dataMenu = this.listMenu.filter(data => data.id == this.selectedMenu)
            console.log(this.dataMenu)
        },
        tambah() {
            this.addModal = true
        },
        edit() {
            this.editModal = true
        },
        submitMenu() {
            if (this.form.harga > 0) {
                this.hargaHandler = false
                this.$emit('submitMenu', this.form.nama, this.form.harga)
                this.addModal = false
                this.form.nama = ''
                this.form.harga = 0
            }
            else {
                this.hargaHandler = true
            }
        },
        submitEditMenu() {
            this.editModal = false
            this.$emit('submitEditMenu', this.selectedMenu, this.dataMenu[0].nama, this.dataMenu[0].harga)
        }
    },
    emits: ['submitMenu', 'submitEditMenu']
}
</script>