<template>
  <button class="button download-button" id="download-button-1" ref="downloadButton1">Download</button>
  <h2 class="heading">Your Customised Travel Itinerary</h2>
  <div class="itinerary-container" v-html="formattedItinerary" ref="itineraryContainer"></div>
  <button class="button download-button" id="download-button-2" ref="downloadButton2">Download</button>
</template>
  
  <script setup>
  import { computed } from "vue";
  import { useRoute } from "vue-router";
  import { ref, onMounted } from 'vue';
  import html2pdf from 'html2pdf.js/dist/html2pdf.bundle.min'
  
  const route = useRoute();

  const downloadButton1 = ref(null);
  const downloadButton2 = ref(null);
  const itineraryContainer = ref(null);

  const payload = route.query.payload;
  const itinerary = computed(() => {
    try {
      return JSON.parse(decodeURIComponent(route.query.itinerary)).result;
    } catch (e) {
      console.error("Error parsing itinerary:", e);
      return "Unable to load itinerary";
    }
  });
  
  // Format the itinerary with proper HTML formatting
  const formattedItinerary = computed(() => {
    if (!itinerary.value) return "";
    
    let formatted = itinerary.value.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  
    formatted = formatted.replace(/^# (.*?)$/gm, "<h3>$1</h3>");
    formatted = formatted.replace(/^## (.*?)$/gm, "<h4>$1</h4>");
    formatted = formatted.replace(/^### (.*?)$/gm, "<h5>$1</h5>");
    
    formatted = formatted.split("\n\n").map(para => {
      if (para.trim() && !para.startsWith("<h")) {
        return `<p>${para}</p>`;
      }
      return para;
    }).join("");
    
    // Format lists
    formatted = formatted.replace(/^\s*[-*]\s+(.*?)$/gm, "<li>$1</li>");
    formatted = formatted.replace(/(<li>.*?<\/li>\n)+/gs, match => `<ul>${match}</ul>`);
    
    // let downloadButton = document.getElementById("download-button");
    // downloadButton.style.display = "block";
    return formatted;
  });


  onMounted(() => {
    if(downloadButton1.value){
      downloadButton1.value.style.display="block"
      downloadButton1.value.addEventListener("click", downloadPdf);
    }

    if(downloadButton2.value){
      downloadButton2.value.style.display="block"
      downloadButton2.value.addEventListener("click", downloadPdf);
    }

  });

  const downloadPdf = () => {
    if(itineraryContainer.value){
      const options = {
        margin: 0.5,
        filename: 'itinerary.pdf',
        image: {type: 'jpeg', quality: 0.98},
        html2canvas: {scale: 2},
        jsPDF: {unit: 'in', format: 'letter', orientation: 'portrait'}
      }

      html2pdf().set(options).from(itineraryContainer.value).save();
    }
  }
  </script>
  
  <style scoped>
    .heading{
        text-align: center;
    }

  .itinerary-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  .itinerary-container h3 {
    color: #2c3e50;
    border-bottom: 2px solid #3498db;
    padding-bottom: 8px;
    margin-top: 24px;
  }
  
  .itinerary-container h4 {
    color: #2c3e50;
    margin-top: 20px;
  }
  
  .itinerary-container h5 {
    color: #2c3e50;
    font-style: italic;
  }
  
  .itinerary-container p {
    line-height: 1.6;
    margin-bottom: 16px;
  }
  
  .itinerary-container ul {
    margin-left: 20px;
    margin-bottom: 20px;
  }
  
  .itinerary-container li {
    margin-bottom: 8px;
  }

  .button{
    display: none;
    font-size: 1.5em;
    border-radius: 15px;
    cursor: pointer;
    margin-top: 1.5em;
    padding: 0.5em;
    background-color: #9ACBD0;
    font-family: "Mulish", sans-serif;
    border: 1px solid #48a6a7;
    color: #000000;
    width: max-content;
    margin: 1em auto;
  }

  #download-button-1:hover, #download-button-2:hover{
    background-color: #48a6a7;
    cursor: pointer;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); /* Shadow effect */
    transform: translateY(-2px);
  }

  </style>