<template>
    <div>
        <div>
        {{ this.milan }}
        </div>

        <div class="row">
            <div class="col-9 offset-3">
                <button @click="getShips()" class="btn btn-primary">
                        Ships name SVP Chef 
                </button>
            </div>
        </div>

        <div class="row">
            <div class="col-5">
                {{this.ships.data}}
            </div>
        </div>
    </div>
</template>


<script>
const default_layout = "default";
export default{
    name: "Ships",
// https://api.worldofwarships.eu/wows/encyclopedia/ships/?application_id=8865e3a6ee278e7ab15861da4c08c372&fields=name

    data() {
        return {
            milan: 'hi sawsan',
            ships: '',
            application_id : '8865e3a6ee278e7ab15861da4c08c372'
        }
    },
    // on peut affichier plusieurs fields avec %2C+
// https://api.worldofwarships.eu/wows/encyclopedia/ships/?application_id=8865e3a6ee278e7ab15861da4c08c372&fields=name%2C+nation&nation=japan
    methods: {

        getShips() {
            console.log(this.application_id);
           // let application_id = '8865e3a6ee278e7ab15861da4c08c372'
            fetch(" https://api.worldofwarships.eu/wows/encyclopedia/ships/?application_id="+this.application_id+"&fields=name&nation=france&type=battleship")
            .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
                
                this.ships = data;

                return  this.ships
            })
            .catch(error => {
                this.errorMessage = error;
                console.error("There was an error!", error);
            });     

        }
    }
}
</script>



<style scoped>

</style>