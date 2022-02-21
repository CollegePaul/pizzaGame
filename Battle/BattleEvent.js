class BattleEvent {
    constructor (event, battle){
        this.event = event;
        this.battle = battle;
    }

    textMessage(){
        console.log("A Message")
        //https://www.youtube.com/watch?v=AG6vXqPV2aE&list=PLcjhmZ8oLT0r9dSiIK6RB_PuBWlG1KSq_&index=12
        //5.36
    }

    init(resolve) {
        this[this.event.type](resolve);
    }



}