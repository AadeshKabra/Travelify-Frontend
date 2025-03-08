<template>
    <div class="iternary-container">
        <h2 class="iternary-heading">Get Iternary</h2>

        <div class="iternary-details">
            <div class="iternary-section-1">
                <div class="iternary-destination iternary-item">
                    <label for="destination" class="destination-label iternary-label">Destination: </label>
                    <input type="text" id="destination" class="destination iternary-input" name="destination" placeholder="Your Destination...">
                </div>
                
                <div class="iternary-date iternary-item">
                    <label for="date" class="date-label iternary-label">Date: </label>
                    <input type="date" id="date" name="date" class="iternary-input">
                </div>

                <div class="iternary-people iternary-item">
                    <div class="iternary-people-adults">
                        <label for="adults" class="adults-label iternary-label">Adults: </label>
                        <input type="number" id="adults" name="adults" min="1" class="iternary-input">
                    </div>
                    
                    <div class="iternary-people-children">
                        <label for="children" class="children-label iternary-label">Children: </label>
                        <input type="number" id="children" name="children" min="0" class="iternary-input">
                    </div>
                    
                </div>
            </div>
            
            <div class="iternary-section-2">
                <div class="iternary-budget iternary-item">
                    <div class="iternary-budget-min">
                        <label for="min-budget" class="min-budget-label iternary-label">Min Budget: </label>
                        <input type="number" id="min-budget" class="min-budget iternary-input" name="min-budget" min="1000">
                    </div>
                    
                    <div class="iternary-budget-max">
                        <label for="max-budget" class="max-budget-label iternary-label">Max Budget: </label>
                        <input type="number" id="max-budget" class="max-budget iternary-input" name="max-budget" min="1000">
                    </div>

                    <div class="iternary-budget-days">
                        <label for="days" class="days-label iternary-label">Days: </label>
                        <input type="number" id="days" class="days iternary-input" name="days" min="1">
                    </div>
                    
                </div>
            </div>

            <div class="iternary-section-3">
                <div class="iternary-description iternary-item">
                    <label for="description" class="description-label iternary-label">Additional Description: </label>
                    <textarea id="description" class="description" placeholder="Describe..." name="description"></textarea>
                </div>
            </div>

            <div class="iternary-section-4">
                <fieldset class="iternary-interests">
                    <legend class="iternary-interests-legend">Choose your interests: </legend>
                    
                    <div class="iternary-options-set-1">
                        <div class="interests-option">
                            <input type="checkbox" id="luxury" name="luxury"/>
                            <label for="luxury" class="interests">Luxury</label>
                        </div>

                        <div class="interests-option">
                            <input type="checkbox" id="adventure" name="adventure"/>
                            <label for="adventure" class="interests">Adventure</label>
                        </div>

                        <div class="interests-option">
                            <input type="checkbox" id="backpacking" name="backpacking"/>
                            <label for="backpacking" class="interests">Backpacking</label>
                        </div>

                        <div class="interests-option">
                            <input type="checkbox" id="business" name="business"/>
                            <label for="business" class="interests">Business</label>
                        </div>
                    </div>

                    <div class="iternary-options-set-2">
                        <div class="interests-option">
                            <input type="checkbox" id="romantic" name="romantic"/>
                            <label for="romantic" class="interests">Romantic</label>
                        </div>

                        <div class="interests-option">
                            <input type="checkbox" id="cultural" name="cultural"/>
                            <label for="cultural" class="interests">Cultural</label>
                        </div>

                        <div class="interests-option">
                            <input type="checkbox" id="spiritual" name="spiritual"/>
                            <label for="spiritual" class="interests">Spiritual</label>
                        </div>

                        
                    </div>
                    
                </fieldset>
            </div>

            <button class="button iternary-button" type="submit" v-on:click="getIternary">Get Iternary</button>
            
        </div>
    </div>
</template>


<script setup>

    import axiosRequest from '../../axios_api';

    async function submitIternary(payload){
        try{
            const response = await axiosRequest.post("/submitIternary", {params: payload});
            console.log(response.data);
        } catch(error){
            console.error(error);
        }
    }

    function getIternary(){
        let destination = document.getElementById("destination").value;
        let date = document.getElementById("date").value;
        let adults = document.getElementById("adults").value;
        let children = document.getElementById("children").value;
        let minBudget = document.getElementById("min-budget").value;
        let maxBudget = document.getElementById("max-budget").value;
        let days = document.getElementById("days").value;
        let description = document.getElementById("description").value;
        let interests = [];
        document.querySelectorAll("iternary-interests input[type='checkbox']:checked")
        .forEach((checkbox)=>{
            interests.push(checkbox.id);
        });

        let payload = {
            destination: destination,
            date: date,
            adults: adults,
            children: children,
            minBudget: minBudget,
            maxBudget: maxBudget,
            days: days,
            description: description,
            interests: interests
        }

        submitIternary(payload);
    }
</script>


<style scoped>

    @import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Playwrite+IN:wght@100..400&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');

    .iternary-container{
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .iternary-heading{
        font-family: "Noto Serif", serif;
        font-size: 2em;
    }

    .iternary-details{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .iternary-section-1, .iternary-section-2, .iternary-section-3, .iternary-section-4{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 2em;
    }

    .iternary-interests{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .iternary-label{
        font-size: 1.25em;
        font-family: "Mulish", sans-serif;
    }

    .iternary-input{
        font-size: 1.25em;
        border-radius: 5px;
        padding: 0.5em;
    }

    .iternary-item{
        margin-left: 1.5em;
    }

    .iternary-people{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .iternary-people-adult, .iternary-people-children{
        margin-left: 0.5em;
    }

    #adults, #children, #days{
        width: 3em;
    }

    .iternary-budget{
        display:flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .iternary-budget-min, .iternary-budget-max, .iternary-budget-days{
        margin-left: 1em;
    }

    #min-budget, #max-budget{
        width: 7em;
    }

    .description-label{
        display: block;
        margin-bottom: 5px;
    }

    .description{
        width: 600px;
        heigth: 500px;
        resize: none;
        padding: 1em;
        border: 1px solid #000000;
        border-radius: 5px;
    }

    .iternary-button{
        font-size: 1.5em;
        border-radius: 15px;
        cursor: pointer;
        margin-top: 1em;
        margin-bottom: 1em;
        padding: 0.5em;
        background-color: #9ACBD0;
        font-family: "Mulish", sans-serif;
        border: 1px solid #48a6a7;
        color: #000000;
        width: 7em;
    }

    .iternary-interests-legend{
        font-size: 1.25em;
        font-family: "Mulish", sans-serif;
    }

    .interests{
        font-size: 1em;
        font-family: "Mulish", sans-serif;
    }

    .interests-option{
        margin-left: 1em;
    }
</style>
