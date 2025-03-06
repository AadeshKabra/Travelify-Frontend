<template>
    <div class="search-template">
        <h2 class="search-heading">Where are you planning to go?</h2>
        <div class="search-box">

            <div class="departure search-box-item">
                <label for="departure-box" class="search-label">Departure: </label>
                <input type="search" id="departure-box" name="departure-box" v-model="departureSearch" @input="filterDepartureAirports" list="departure-suggestions" autocomplete="off">
                <datalist id="departure-suggestions">
                    <option v-for="airport in filteredDepartureAirports" :key="airport.iata" :value="`${airport.iata} - ${airport.name}`" class="departure-suggestion">
                        {{ airport.iata }} - {{ airport.name }}
                    </option>
                </datalist>
            </div>

            <font-awesome-icon :icon="['fass', 'arrow-right']" size="lg" style="color: #48a6a7;" class="arrow-icon" />

            <div class="arrival search-box-item">
                <label for="arrival-box" class="search-label">Arrival: </label>
                <input type="search" id="arrival-box" name="arrival-box" v-model="arrivalSearch" @input="filterArrivalAirports" list="arrival-suggestions" autocomplete="off">
                <datalist id="arrival-suggestions">
                    <option v-for="airport in filteredArrivalAirports" :key="airport.iata" :value="`${airport.iata} - ${airport.name}`" class="arrival-suggestion">
                        {{ airport.iata }} - {{ airport.name }}
                    </option>
                </datalist>
            </div>

            <div class="date search-box-item">
                <label for="date" class="search-label">Date:</label>
                <input type="date" id="date" name="date">
            </div>

        </div>
        <button type="submit" id="search-button" class="button search-button" v-on:click="searchFlights">Search</button>
    </div>

    <div class="search-results" v-if="bestFlights && bestFlights.length > 0">
        <h2>Best Flights</h2>
        <div class="best-flights">
            <div class="flight-card" v-for="(flight, index) in bestFlights" :key="index">
                <div class=airline-card>
                    <img :src="flight.flights[0].airline_logo" class="airline-logo">
                    <p>{{ flight.flights[0].airline }}</p>
                    <p>{{ flight.flights[0].airplane }}</p>
                    <p>{{ flight.flights[0].flight_number }}</p>
                </div>
                <div class="flight-detail-card">
                    <div class="iata-codes">
                        <h2 classs="iata-codes-data">{{ flight.flights[0].departure_airport.id }}</h2>
                        <font-awesome-icon :icon="['fass', 'arrow-right']" style="color: #48a6a7;" class="iata-codes-data"/>
                        <h2 class="iata-codes-data">{{ flight.flights[0].arrival_airport.id }}</h2>
                    </div>
                    <div class="airport-names">
                        <p>{{ flight.flights[0].departure_airport.name }} to {{ flight.flights[0].arrival_airport.name }}</p>
                        <!-- <p>{{ flight.flights[0].arrival_airport.name }}</p> -->
                         <p>{{ flight.flights[0].departure_airport.time }}   =>   {{ flight.flights[0].arrival_airport.time }}</p>
                    </div>
                    
                </div>
                <div class="other-detail-card">
                    <p>Duration: {{ flight.total_duration }}</p>
                    <p>Price: {{ flight.price }}</p>
                    <p>Carbon Emission: {{ flight.carbon_emissions.this_flight }}</p>
                </div>
                <!-- <p>{{ flight }}</p> -->
            </div>
        </div>
    </div>

</template>

<script setup>
    import axios from 'axios';
    import { onMounted, ref } from 'vue'
    import axiosRequest from '../../axios_api';

    const airports = ref([]);
    const departureSearch = ref('');
    const arrivalSearch = ref('');
    const filteredDepartureAirports = ref([]);
    const filteredArrivalAirports = ref([]);
    const bestFlights = ref([]);
    const otherFlights = ref([]);

    const apiKey = import.meta.env.VITE_AIRPORTS_API_KEY

    const options = {
        method: 'GET',
        url: 'https://sky-scanner3.p.rapidapi.com/flights/airports',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com'
        }
    }

    async function getAirports(){
        try{
            const response = await axios.request(options);
            // console.log(response.data);
            airports.value = response.data.data.map(airport => ({
                iata: airport.iata,
                name: airport.name,
                location: airport.location
            })).filter(airport => airport.iata)
        }catch(error){
            console.error(error);
        }
    }

    function filterAirports(search, isArrival=false){
        const searchTerm = (search || '').toLowerCase().trim();

        if(!searchTerm){
            if(isArrival){
                filteredArrivalAirports.value = [];
            }else{
                filteredDepartureAirports.value = [];
            }
            return 
        }

        const filtered = airports.value.filter(airport => {
            const nameMatch = String(airport.name).toLowerCase().includes(searchTerm);
            const codeMatch = String(airport.iata).toLowerCase().includes(searchTerm);
            const locationMatch = String(airport.location).toLowerCase().includes(searchTerm);
            return nameMatch || codeMatch || locationMatch;
        })

        if(isArrival){
            filteredArrivalAirports.value = [...filtered];
        }else{
            filteredDepartureAirports.value = [...filtered];
        }

    }

    function filterDepartureAirports(){
        filterAirports(departureSearch.value, false);
    }

    function filterArrivalAirports(){
        filterAirports(arrivalSearch.value, true);
    }

    async function searchFlights(){
        // console.log("Searching for flights...");
        // console.log(apiKey);
        let departureDestination = document.getElementById("departure-box").value;
        let arrivalDestination = document.getElementById("arrival-box").value;
        let departureDate = document.getElementById("date").value;

        try{
            let payload = {
                departure: departureDestination,
                arrival: arrivalDestination,
                date: departureDate
            }

            const response = await axiosRequest.post("/getFlights", {params: payload});
            bestFlights.value = response.data.best_flights;
            otherFlights.value = response.data.other_flights;
            console.log(bestFlights.value);
        } catch (error){
            if(error.response){
                console.error(error.response.data);
            }
        }
        
        
    }

    onMounted(() => {
        getAirports();
    })
    
</script>


<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Playwrite+IN:wght@100..400&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');

    .search-template{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .search-heading{
        font-family: "Noto Serif", serif;
        font-size: 2em;
    }

    .search-box{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 1.5em;
        margin-bottom: 1.5em;
    }

    .search-box-item{
        margin-left: 1em
    }

    #departure-box{
        margin-left: 0.5em;
    }

    #arrival-box{
        margin-left: 0.5em;
    }

    #date{
        margin-left: 0.5em;
    }

    #departure-box, #arrival-box, #date{
        font-size: 1.5em;
        border-radius: 5px;
        padding: 0.5em;
    }

    .deaparture-suggestions, .arrival-suggestions{
        background-color: white;
    }

    .search-label{
        font-size: 1.5em;
        font-family: "Mulish", sans-serif;
    }

    .search-button{
        font-size: 1.5em;
        border-radius: 15px;
        cursor: pointer;
        margin-top: 1em;
        padding: 0.5em;
        background-color: #9ACBD0;
        font-family: "Mulish", sans-serif;
        border: 1px solid #48a6a7;
        color: #000000;
        width: 5em;
    }

    .search-button:hover{
        background-color: #9ACBD0;
        cursor: pointer;
    }

    .arrow-icon{
        font-size: 2em;
        margin-left: 0.75em;
    }

    .search-results{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 5em;
    }

    .flight-card{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border: 1px solid #48a6a7;
        padding: 2em;
        margin-top: 1em;
        margin-bottom: 1em;
        border-radius: 10px;
    }

    .airline-card{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-left: 1em;
    }

    .flight-detail-card{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-left: 3em;
    }

    .other-detail-card{
        margin-left: 3em;
    }

    .iata-codes{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .iata-codes-data{
        margin-left: 1em;
    }

    .airport-names{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>

