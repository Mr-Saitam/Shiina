import { EventBuilder } from "../../interfaces/Event";

export default new EventBuilder("ready", true)
.setCallback(async client => {
    console.log('ESTOY VIVO')
    
   
})

