<template>
    <div class="w-screen h-[2.5cm] bg-red-600 text-white text-[20px] font-bold flex">
        <button @click="select(1)" class="flex items-center w-[4cm]" :class="menu == 1 ? 'bg-red-300' : '' " >
            <p class="mx-auto my-auto">BERANDA</p>
        </button>
        <button @click="select(2)" class="flex items-center w-[4cm]" :class="menu == 2 ? 'bg-red-300' : ''">
            <p class="mx-auto my-auto">NOTA</p>
        </button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            menu: 1
        }
    },
    created() {
        if(this.$route.path === '/nota') {
            this.menu = 2
        }else {
            this.menu = 1
        }
    },
    methods: {
        select(menu) {
            this.menu = menu
            if(menu == 1) 
                this.$router.push('/')
            else
                this.$router.push('/nota')
        }
    }
}
</script>