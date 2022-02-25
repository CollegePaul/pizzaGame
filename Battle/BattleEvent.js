class BattleEvent {
    constructor (event, battle){
        this.event = event;
        this.battle = battle;
    }

    textMessage(resolve){

        const text = this.event.text
        .replace("{CASTER}", this.event.caster?.name)
        .replace("{TARGET}", this.event.target?.name)
        .replace("{ACTION}", this.event.action?.name)

        const message = new TextMessage({
            
           text,
            onComplete: () => {
                resolve()
            }
        })
        message.init(this.battle.element)
    }

    async stateChange(resolve){
        const {caster, target, damage}  = this.event;
        if (damage) {
            //modify the target to have less hp
            
            //start blinking
            target.pizzaElement.classList.add("battle-damage-blink");
            //https://www.youtube.com/watch?v=AG6vXqPV2aE&t=643s
        }
            //wait a bit
        await utils.wait(600)

            //stop blinking

        resolve();
    }

    submissionMenu(resolve){
        const menu = new SubmissionMenu({
            caster: this.event.caster,
            enemy: this.event.enemy,
            onComplete: submission => {
                //submission {what to move to use, who on}
                resolve(submission)
            }

        })

        menu.init(this.battle.element);
    }

    init(resolve) {
        this[this.event.type](resolve);
    }



}