require('./bootstrap');
//let cors = require('./cors');

import Vue from "vue"

import AppCal from './components/App.vue'
import Ships from './components/Ships.vue'

const app = new Vue({
    el: '#milan',
    components: { 
        AppCal ,
        Ships,
    }


});