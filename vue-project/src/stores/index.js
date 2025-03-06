import { defineStore } from "pinia";

export const useStore = defineStore('storeId', {
    state: () => {
        return {
            name: "",
            email: ""
        }
    },
    actions: {
        setName(payload){
            this.name = payload;
        },
        setEmail(payload){
            this.email = payload;
        }
    }
})