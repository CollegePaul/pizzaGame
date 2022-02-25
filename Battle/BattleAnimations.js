window.BattleAnimations = {
    async spin(event, onComplete) {
        const element = event.caster.pizzaElement;
        const animationClassName = event.caster.team === "player" ? "battle-spin-right" : "battle-spin-left";
        
        //add the class
        element.classList.add(animationClassName);

        //when done remove
        element.addEventListener("animationend", () => {
            element.classList.remove(animationClassName);
        }, {once: true});
        
        //continue battle right around when the pizas collide
        //so the hp reduction happens when the pizas collide and not
        //when the animation compleates
        await utils.wait(100);
        onComplete();
    }
}