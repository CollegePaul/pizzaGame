window.Actions = {
    damage1: {
        name: "Whomp!",
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}!"},
            { type: "stateChange", damage: 10}
        ]
    }
}