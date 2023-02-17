import { EventBuilder } from "../../interfaces/Event";

export default new EventBuilder("ready", true)
.setCallback(async client => {
    client.manager.init(client.user.id);
    console.log('ESTOY VIVO')
    
   
})

