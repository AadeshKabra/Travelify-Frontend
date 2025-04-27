<template>
    <h2 class="heading">Your Customised Travel Itinerary</h2>
    <div class="itinerary-container" v-html="formattedItinerary"></div>
  </template>
  
  <script setup>
  import { computed } from "vue";
  import { useRoute } from "vue-router";
  
  const route = useRoute();
  
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
    
    // Replace markdown bold with HTML bold
    let formatted = itinerary.value.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    
    // Replace markdown headers
    formatted = formatted.replace(/^# (.*?)$/gm, "<h3>$1</h3>");
    formatted = formatted.replace(/^## (.*?)$/gm, "<h4>$1</h4>");
    formatted = formatted.replace(/^### (.*?)$/gm, "<h5>$1</h5>");
    
    // Convert newlines to paragraphs
    formatted = formatted.split("\n\n").map(para => {
      if (para.trim() && !para.startsWith("<h")) {
        return `<p>${para}</p>`;
      }
      return para;
    }).join("");
    
    // Format lists
    formatted = formatted.replace(/^\s*[-*]\s+(.*?)$/gm, "<li>$1</li>");
    formatted = formatted.replace(/(<li>.*?<\/li>\n)+/gs, match => `<ul>${match}</ul>`);
    
    return formatted;
  });
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
  </style>