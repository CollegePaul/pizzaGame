class TurnCycle {
    constructor ({battle, onNewEvent}){
        this.battle = battle;
        this.onNewEvent = onNewEvent;
        this.currentTeam = "player"; //or "enemy"
    }

    async turn(){

    }
    

    init() {
        await this.onNewEvent({
            type: "textMessage",
            text: "The battle is starting"
        })

        this.turn();
    }


}