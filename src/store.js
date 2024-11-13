import { createStore } from "vuex";

import axios from "axios";
import url from './api';

export default createStore({
    state: {
        menu: [],
        dataNota: [],
        listNota: [],
        query: '',
        idTransaksi: '',
        totalPrice: 0,
        disc: 0
    },
    mutations: {
        setMenu(state, menu) {
            state.menu = menu
        },
        setQuery(state, query) {
            state.query = query
        },
        setDataNota(state, dataNota) {
            state.dataNota = dataNota
        },
        setListNota(state, listNota) {
            state.listNota = listNota
        },
        setIdTransaksi(state, idTransaksi) {
            state.idTransaksi = idTransaksi
        },
        setTotalPrice(state, totalPrice) {
            state.totalPrice = totalPrice
        },
        setDiscount(state, disc) {
            state.disc = disc
        }
    },
    actions: {
        async fetchMenu({ commit }) {
            await axios.get(url + 'menu', {
                headers: {
                    Accept: 'application/json'
                }
            }).then(res => {
                commit('setMenu', res.data.menu)
            }).catch((e) => {
                console.error(e.response)
                console.error(e.response.message)
            })
        },
        async fetchNota({ commit }, { id_transaksi, disc }) {
            await axios.get(url + `nota/${id_transaksi}`, {
                headers: {
                    Accept: 'application/json'
                }
            }).then(res => {
                const data = res.data.data
                const totalPrice = data.reduce(function(total, item) {
                    return total + item.harga
                },0)
                let totalDisc = totalPrice * (disc / 100)
                let finalPrice = totalPrice - totalDisc
                console.log("disc" + totalDisc)
                
                commit('setDiscount', disc)
                commit('setTotalPrice', finalPrice)
                commit('setDataNota', data)
            }).catch((e) => {
                console.error(e)
            })
        },
        async fetchListNota() {
            await axios.get(url + 'trans', {
                headers: {
                    Accept: 'application/json'
                }
            }).then(res => {
                this.commit('setListNota', res.data.data)
            }).catch((e) => {
                console.error(e.response)
                console.error(e.response.data)
            })
        },
        async storeNota({ commit }, { id_transaksi, id_menu, disc }) {
            await axios.post(url + 'post-nota', {
                id_transaksi: id_transaksi,
                id_menu: id_menu
            }, {
                headers: {
                    Accept: 'application/json'
                }
            }).then(res => {
                this.dispatch('fetchNota', { id_transaksi: id_transaksi, disc: disc })
            }).catch((e) => {
                console.error(e.response)
                console.error(e.response.message)
            })
        },
        async storeMenu({ commit }, { nama, harga }) {
            await axios.post(url + 'post-menu', {
                nama: nama,
                harga: harga
            }, {
                headers: {
                    Accept: 'application/json'
                }
            }).then(res => {
                console.log(res)
                this.dispatch('fetchMenu')
            }).catch((e) => {
                console.error(e.response)
                console.error(e.response.message)
            })
        },
        async generateIdTransaksi({ commit }) {
            await axios.get(url + 'id-trans', {
                headers: {
                    Accept: 'application/json'
                }
            }).then(res => {    
                commit('setIdTransaksi', res.data)
            }).catch((e) => {
                console.error(e.response)
            })
        },
        async storeTransaksi({ commit }, {id_transaksi, nama, total_harga, diskon}) {
            await axios.post(url + 'post-trans', {
                id_transaksi: id_transaksi,
                nama: nama,
                total_harga: total_harga,
                diskon: diskon
            }, {
                headers: {
                    Accept: 'application/json'
                }
            }).then(res => {
            }).catch((e) => {
                console.error(e.response)
                console.error(e.response.message)
            })
        },
        async updateNota({ commit }, { id_transaksi, id_menu, jumlah, disc }) {
            await axios.put(url + `put-nota/${id_transaksi}/${id_menu}?jumlah=${jumlah}`, {}, {
                headers: {
                    Accept: 'application/json'
                }
            }).then(res => {
                this.dispatch('fetchNota', { id_transaksi: id_transaksi, disc: disc })
            }).catch((e) => {
                console.error(e.response)
                console.error(e.response.message)
            })
        },
        async updateMenu({ commit }, { id, nama, harga }) {
            await axios.put(url + `put-menu/${id}?nama=${nama}&harga=${harga}`, {}, {
                headers:{
                    Accept: 'application/json'
                }
            }).then(res => {
                console.log(res)
                this.dispatch('fetchMenu')
            }).catch((e) => {
                console.error(e.response)
                console.error(e.response.message)
            })
        },
        async cancelTransaksi({ commit }, { id }) {
            await axios.put(url + `put-trans/${id}`,{}, {
                headers: {
                    Accept: 'application/json'
                }
            }).then(res => {
                console.log(res)
                this.dispatch('fetchListNota')
            }).catch((e) => {
                console.error(e.response)
                console.error(e.response.message)
            })
        },
        searchQuery({ commit }, query) {
            commit('setQuery', query)
        }
    },
    getters: {
        menu(state) {
            return state.menu
        },
        dataNota(state) {
            return state.dataNota
        },
        listNota(state) {
            return state.listNota
        },
        idTransaksi(state) {
            return state.idTransaksi
        },
        totalPrice(state) {
            return state.totalPrice
        },
        disc(state) {
            return state.disc
        },
        filterMenu(state) {
            if(!state.query) {
                return state.menu
            } 
            return state.menu.filter(item => 
                item.nama.toLowerCase().includes(state.query.toLowerCase())
            )
        }
    }
})