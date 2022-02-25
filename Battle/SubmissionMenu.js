class SubmissionMenu {
    constructor({caster, enemy, onComplete}) {
        this.caster = caster;
        this.ememy = enemy;
        this.onComplete = onComplete;
    }

    decide(){
        this.onComplete({
            action: Actions[ this.caster.actions[0] ],
            target: this.ememy
        })
    }

    init(container){
        this.decide()

    }
}