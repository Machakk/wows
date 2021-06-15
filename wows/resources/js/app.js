require('./bootstrap');

import Vue from "vue"

import AppCal from './components/App.vue'

const app = new Vue({
    el: '#app',
    components: { AppCal }
});