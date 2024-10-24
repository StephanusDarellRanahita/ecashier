import { createStore } from "vuex";

import axios from "axios";
import url from './api';

export default createStore({
    state: {
        menu: [],
        dataNota: [],
        query: '',
        idTransaksi: '',
        totalPrice: 0
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
        setIdTransaksi(state, idTransaksi) {
            state.idTransaksi = idTransaksi
        },
        setTotalPrice(state, totalPrice) {
            state.totalPrice = totalPrice
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
        async fetchNota({ commit }, { id_transaksi }) {
            await axios.get(url + `nota/${id_transaksi}`, {
                headers: {
                    Accept: 'application/json'
                }
            }).then(res => {
                console.log('ID' + id_transaksi)
                console.log(res.data)
                const data = res.data.data
                const totalPrice = data.reduce(function(total, item) {
                    return total + item.harga
                },0)
                console.log(totalPrice)
                commit('setTotalPrice', totalPrice)
                commit('setDataNota', data)
            }).catch((e) => {
                console.error(e)
            })
        },
        async storeNota({ commit }, { id_transaksi, id_menu }) {
            await axios.post(url + 'post-nota', {
                id_transaksi: id_transaksi,
                id_menu: id_menu
            }, {
                headers: {
                    Accept: 'application/json'
                }
            }).then(res => {
                console.log(res.data)
                this.dispatch('fetchNota', { id_transaksi: id_transaksi })
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
        idTransaksi(state) {
            return state.idTransaksi
        },
        totalPrice(state) {
            return state.totalPrice
        },
        filterMenu(state) {
            if(!state.query) {
                return state.menu
            } 

            console.log(state.query)
            return state.menu.filter(item => 
                item.nama.toLowerCase().includes(state.query.toLowerCase())
            )
        }
    }
})