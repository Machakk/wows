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

        <div v-if="this.shipId.length > 0">
            <!-- {{this.shipId[0].description}} -->
            {{this.shipId[0].upgrades}}
            <p> <br></p>  
        </div>

        <div class="row" v-if="this.nas_obj.pom_obj != null">
            <div class="col-5">
                {{this.nas_obj.pom_obj.data}}
            </div>
        </div>

        {{this.up1}}
        

        <div class="container m-3">
        <div class="row m-3">
                <div class="form-group col-3 m-3">
                    <label for=""> Ship ID STPP </label>
                </div>
                <div class="form-group col-3 my-3">
                    <input type="text" v-model="form.shipid" class="form-control" name="nick" >
                </div>
        </div>

        <div class="row">
            <div class="col-9 offset-3">
                <button @click="chercheShip()" class="btn btn-primary">
                        cherche 
                </button>
            </div>
        </div>
    </div>
    </div>
</template>


<script>
const default_layout = "default";
export default{
    name: "Ships",

    data() {
        return {
            milan: 'hi sawsan',
            ships: '',
            application_id : '8865e3a6ee278e7ab15861da4c08c372',
            shipId:'',
            form: {
                shipid:'',
            },
            upgrades:'',
            up1: this.dis,
            nas_obj: this.det

        }
    },

    props: {
        dis: {
            type: Array,
            default: ()=> {
                return ([])
            }
        },
        det: {
            type: Object,
            default: ()=> {
                return ({})
            }
        }
    },
    // on peut affichier plusieurs fields avec %2C+
// https://api.worldofwarships.eu/wows/encyclopedia/ships/?application_id=8865e3a6ee278e7ab15861da4c08c372&fields=name%2C+nation&nation=japan
    methods: {

        getPlayer() {
            this.nas_obj = {
                'someName':'player',
                'pom_obj': {},
                'obj2': {},
                'brojGodina': 1996,
                "myObj":function(){ 
                    console.log(this.someName);
                    var num = 58 * 58 * 78;
                    console.log(num)
                }

            }
            fetch("https://api.worldofwarships.eu/wows/account/list/?application_id=8865e3a6ee278e7ab15861da4c08c372&search=62305")
            .then(async response => {
                const data = await response.json();
                this.nas_obj.pom_obj = data
                console.log(this.nas_obj)
                console.log(this.nas_obj.pom_obj.data[0].account_id); //id
                console.log(this.nas_obj.myObj());
            })
        },

        getShips() {
           // let application_id = '8865e3a6ee278e7ab15861da4c08c372'
            fetch(" https://api.worldofwarships.eu/wows/encyclopedia/ships/?application_id=8865e3a6ee278e7ab15861da4c08c372&fields")
            .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
                
                this.shipId = data;

                console.log(data);
                return  this.shipId;

            })
            .catch(error => {
                this.errorMessage = error;
                console.error("There was an error!", error);
            });     

        },

        async  chercheShip() {
            var objek_koji_skladisti_4_fech_objkata = {}

            let result = await this.getShipById(this.form.shipid);

            // this.getUpgrades();
            this.getPlayer();
        },
        getShipById(id) {
            let application_id = '8865e3a6ee278e7ab15861da4c08c372'
            return fetch("https://api.worldofwarships.com/wows/encyclopedia/ships/?application_id="+ application_id +"&ship_id="+id)
            .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            
            //this.shipId = data.data;
            this.shipId = Object.values( data.data);
            console.log(this.shipId[0])
            this.upgrades = this.shipId[0].upgrades
           
            console.log(this.upgrades);
            return this.shipId
            })
            .catch(error => {
            this.errorMessage = error;
            console.error("There was an error!", error);
            });     
        },

        getUpgrades() {
            let application_id = '8865e3a6ee278e7ab15861da4c08c372'
            for(let i=0 ;  i < this.upgrades.length; i++){

                console.log(this.upgrades[i])
                fetch("https://api.worldofwarships.eu/wows/encyclopedia/consumables/?application_id="+ application_id +"&consumable_id="+ this.upgrades[i])
                .then(async response => {
                    const data = await response.json();   
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                    let up2 = this.up1.push(data.data) ;
                
                })
                .catch(error => {
                    this.errorMessage = error;
                    console.error("There was an error!", error);
                });
            }
            
        },


        // for tableau fetch 
    }
}
</script>



<style scoped>

</style>