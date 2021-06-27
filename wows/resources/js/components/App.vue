<template>
    <div>
        <div>
           <!-- {{data.data[numero].images.small}} -->
        </div>
    
   {{this.data222.data}}

    <div class="container m-3">
        <div class="row m-3">
                <div class="form-group col-3 m-3">
                    <label for=""> player nickname </label>
                </div>
                <div class="form-group col-3 my-3">
                    <input type="text" v-model="form.nick" class="form-control" name="nick" >
                </div>
        </div>

        <div class="row">
            <div class="col-9 offset-3">
                <button @click="chercherJoueur()" class="btn btn-primary">
                        cherche 
                </button>
            </div>
        </div>
    </div>

    <!--
        <p v-for="key in data.data">
        {{key.nation}}
        {{key.description}}
        {{key.name}}
        {{key.torpedoes}}
        {{key.modules}}
        </p>
        -->
    </div>
  
</template>
<script>
const default_layout = "default";

export default {
    computed: {},
    name : "AppCal",
    data() {
        return {
            message:'Hello Sawsannn :)',
            info : null,
            
            weather: {},
            data: {
            src: {}
            },
            numero: "3315513040",

            form: {
                nick:'',
            },

            account_id : '', 

            data222: ''
        }
    }, 

    methods: {

        async  chercherJoueur() {
        let result = await this.getId(this.form.nick);

        this.getPlayer(this.account_id);
        },
            
        // recupèrer l'account_id
        getId(nick) {
            let application_id = '8865e3a6ee278e7ab15861da4c08c372'
            return fetch("https://api.worldofwarships.eu/wows/account/list/?application_id="+ application_id +"&search="+nick)
            .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            this.totalVuePackages = data.total;
            this.data = data;
            this.account_id = this.data.data[0].account_id;
            return this.account_id
            })
            .catch(error => {
            this.errorMessage = error;
            console.error("There was an error!", error);
            });     
        },


        // recupère les données de joueur
        getPlayer(id) {
            fetch("https://api.worldofwarships.eu/wows/account/info/?application_id=8865e3a6ee278e7ab15861da4c08c372&account_id="+id)
            .then(async response => {
                const data = await response.json();   
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
                this.totalVuePackages = data.total;
                this.data222 = data;
            })
            .catch(error => {
                this.errorMessage = error;
                console.error("There was an error!", error);
            });
        },

    }
};
</script>

<style scoped>

</style>