class TurnCycle {
    constructor ({battle, onNewEvent}){
        this.battle = battle;
        this.onNewEvent = onNewEvent;
        this.currentTeam = "player"; //or "enemy"
    }

    async turn(){
        //get the caster
        const casterId = this.battle.activeCombatants[this.currentTeam];
        const caster = this.battle.combatants[casterId];

        //enemy
        const enemyId = this.battle.activeCombatants[caster.team === "player" ? "enemy" : "player"];
        const enemy = this.battle.combatants[enemyId];

        const submission = await this.onNewEvent({
            type: "submissionMenu",
            caster,
            enemy
        })  

        const resultingEvents = caster.getRelpacedEvents(submission.action.success);

        for (let i=0; i<resultingEvents.length; i++){
            const event = {
                ...resultingEvents[i],
                submission,
                action: submission.action,
                caster,
                target: submission.target,
            }

            await this.onNewEvent(event);
        }

        //check for post (events that happen after main event is completed)
        const postEvents = caster.getPostEvents();
        for (let i=0; i<postEvents.length; i++){
             const event = {
                 ...postEvents[i],
                 submission,
                 action: submission.action,
                 caster,
                 target: submission.target,

             }
             await this.onNewEvent(event)
        }

        //check for status expire
        const expiredEvent = caster.decrementStatus();
        if (expiredEvent){
            await this.onNewEvent(expiredEvent);
        }

        this.currentTeam = this.currentTeam == "player" ? "enemy" : "player";
        this.turn();
    }

    
    
    

    async init() {
        await this.onNewEvent({
            type: "textMessage",
            text: "The battle is starting"
        })

        this.turn();
    }


}