<template>
    <h1 class="heading">Pic 2 Place</h1>
    <div class="image-container">
        <form class="form">
            <input type="file" accept="image/*" @change="handleImageUpload" class="image-input" 
            id="imageInput"/>
            <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" class="preview-image" />
            <button v-if="imageFile" @click="uploadImage" class="location-button" type="button">Identify Location</button>
        </form>
    </div>

    <div v-if="loading" class="loading-container">
        <div class="spinner"></div>
        <p>Processing Image...</p>
    </div>

    <div class="location-container" v-if="locationResult">
        <h2>{{ location }}</h2>
        <p>{{ locationResult }}</p>
    </div>
</template>


<script setup>
    import { ref } from "vue";
    import axiosRequest from "../../axios_api";

    const imageUrl = ref(null);
    const imageFile = ref(null);
    const locationResult = ref(null);
    const location = ref(null);
    const loading = ref(false);

    const handleImageUpload = (event) => {
        let imageInput = document.getElementById("imageInput");
        imageInput.style.display = "none";
        const file = event.target.files[0];
        if(file){
            imageFile.value = file;
            imageUrl.value = URL.createObjectURL(file);
        }
    };

    const uploadImage = async() => {
        if(!imageFile.value){
            alert("Please select an image first");
            return;
        }

        const formData = new FormData();
        formData.append("image", imageFile.value);
        
        loading.value = true;

        try{
            const response = await axiosRequest.post("/picture2Place", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });
            console.log(response.data);
            locationResult.value = response.data.result;
            location.value = response.data.Location;
        } catch (error){
            console.error(error);
            locationResult.value = "Couldn't find location"
        } finally{
            loading.value = false;
        }
    }
</script>


<style scoped>
    .image-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .form{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .preview-image{
        max-width: 90vh;
        max-height: 70vh;
    }

    .heading{
        text-align: center;
    }

    .location-button{
        margin-top: 1em;
        font-size: 1.5em;
        border-radius: 15px;
        cursor: pointer;
        margin-top: 1em;
        padding: 0.5em;
        background-color: #9ACBD0;
        font-family: "Mulish", sans-serif;
        border: 1px solid #48a6a7;
        color: #000000;
        width: max-content;
    }

    .location-button:hover{
        background-color: #9ACBD0;
        cursor: pointer;
    }

    .loading-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 1em;
    }

    .spinner{
        width: 40px;
        height: 40px;
        border: 5px solid #cccccc;
        border-top-color: #48a6a7;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .location-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 1em;
        padding: 1em;
        border: 1px solid #48a6a7;
        background-color: #e0f7fa;
        border-radius: 10px;
        max-width: 90vh;
        margin-left: auto;
        margin-right: auto;
    }
</style>