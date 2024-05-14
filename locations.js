const items = require("./items.js");
const startCombat = require("./kampfsystem.js");

const locations = {
    "i.2": {
        name: "Shop",
        entry: "Du betrittst den Shop.",
        description: "----",
    },
    "i.3": {
        name: "Dorf der Anfänge",
        entry: "Du betrittst das Dorf der Anfänge",
        description: "----",
    },
    "i.4": {
        name: "Kreuzung",
        entry: "Du betrittst die Kreuzung",
        description: "----",
        chest: {
            contents: [items.healPotion, items.coin, items.sword],
        },
    },
    "j.4": {
        name: "Wald 1",
        entry: "Du betrittst Wald 1",
        description: "----",
    },

    "k.4": {
        name: "Wald 2",
        entry: "Du betrittst Wald 2",
        description: "----",
    },

    "k.3": {
        name: "Wald 3",
        entry: "Du betrittst Wald 3",
        description: "----",
    },

    "k.2": {
        name: "Wald 4",
        entry: "Du betrittst Wald 4",
        description: "----",
    },
    "l.4": {
        name: "Wald 5",
        entry: "Du betrittst Wald 5",
        description: "----",
    },
    "l.3": {
        name: "Wald 6",
        entry: "Du betrittst Wald 6",
        description: "----",
    },
    "l.2": {
        name: "Wald 7",
        entry: "Du betrittst Wald 7",
        description: "----",
    },
    "m.4": {
        name: "Wald 8",
        entry: "Du betrittst Wald 8",
        description: "----",
    },
    "m.3": {
        name: "Wald 9",
        entry: "Du betrittst Wald 9",
        description: "----",
    },
    "m.2": {
        name: "Wald 10",
        entry: "Du betrittst Wald 10",
        description: "----",
    },
    "n.4": {
        name: "Wald 11",
        entry: "Du betrittst Wald 11",
        description: "----",
    },
    "n.3": {
        name: "Wald 12",
        entry: "Du betrittst Wald 12",
        description: "----",
    },
    "n.2": {
        name: "Wald 13",
        entry: "Du betrittst Wald 13",
        description: "----",
    },
    "n.5": {
        name: "Wald 14",
        entry: "Du betrittst Wald 14",
        description: "----",
    },
    "o.5": {
        name: "Wald 15",
        entry: "Du betrittst Wald 15",
        description: "----",
    },
    "p.5": {
        name: "Wald 16",
        entry: "Du betrittst Wald 16",
        description: "----",
    },
    "h.4": {
        name: "Höhle 1",
        entry: "Du betrittst Höhle 1",
        description: "----",
    },
    "g.4": {
        name: "Höhle 2",
        entry: "Du betrittst Höhle 2",
        description: "----",
    },
    "g.3": {
        name: "Höhle 3",
        entry: "Du betrittst Höhle 3",
        description: "----",
    },
    "g.2": {
        name: "Höhle 4",
        entry: "Du betrittst Höhle 4",
        description: "----",
    },
    "f.4": {
        name: "Höhle 5",
        entry: "Du betrittst Höhle 5",
        description: "----",
    },
    "f.3": {
        name: "Höhle 6",
        entry: "Du betrittst Höhle 6",
        description: "----",
    },
    "f.2": {
        name: "Höhle 7",
        entry: "Du betrittst Höhle 7",
        description: "----",
    },
    "e.4": {
        name: "Höhle 8",
        entry: "Du betrittst Höhle 8",
        description: "----",
    },
    "e.3": {
        name: "Höhle 9",
        entry: "Du betrittst Höhle 9",
        description: "----",
    },
    "e.2": {
        name: "Höhle 10",
        entry: "Du betrittst Höhle 10",
        description: "----",
    },
    "d.4": {
        name: "Höhle 11",
        entry: "Du betrittst Höhle 11",
        description: "----",
    },
    "d.3": {
        name: "Höhle 12",
        entry: "Du betrittst Höhle 12",
        description: "----",
    },
    "d.2": {
        name: "Höhle 13",
        entry: "Du betrittst Höhle 13",
        description: "----",
    },
    "d.5": {
        name: "Höhle 14",
        entry: "Du betrittst Höhle 14",
        description: "----",
    },
    "c.5": {
        name: "Höhle 15",
        entry: "Du betrittst Höhle 15",
        description: "----",
    },
    "b.5": {
        name: "Höhle 16",
        entry: "Du betrittst Höhle 16",
        description: "----",
    },
    "i.5": {
        name: "Stadt 1",
        entry: "Du betrittst Stadt 1",
        description: "----",
        chest: {
            contents: ["Heiltrank", "Goldmünzen", "Schwert"],
        },
    },
    "i.7": {
        name: "Stadt 2",
        entry: "Du betrittst Stadt 2",
        description: "----",
    },
    "i.8": {
        name: "Stadt 3",
        entry: "Du betrittst Stadt 3",
        description: "----",
    },
    "i.6": {
        name: "Stadt 4",
        entry: "Du betrittst Stadt 4",
        description: "----",
    },
    "j.6": {
        name: "Stadt 5",
        entry: "Du betrittst Stadt 5",
        description: "----",
    },
    "j.7": {
        name: "Stadt 6",
        entry: "Du betrittst Stadt 6",
        description: "----",
    },
    "j.8": {
        name: "Stadt 7",
        entry: "Du betrittst Stadt 7",
        description: "----",
    },
    "k.6": {
        name: "Stadt 8",
        entry: "Du betrittst Stadt 8",
        description: "----",
    },
    "k.7": {
        name: "Stadt 9",
        entry: "Du betrittst Stadt 9",
        description: "----",
    },
    "k.8": {
        name: "Stadt 10",
        entry: "Du betrittst Stadt 10",
        description: "----",
    },
    "l.6": {
        name: "Stadt 11",
        entry: "Du betrittst Stadt 11",
        description: "----",
    },
    "l.7": {
        name: "Stadt 12",
        entry: "Du betrittst Stadt 12",
        description: "----",
    },
    "l.8": {
        name: "Stadt 13",
        entry: "Du betrittst Stadt 13",
        description: "----",
    },
    "l.9": {
        name: "Stadt 14",
        entry: "Du betrittst Stadt 14",
        description: "----",
    },
    "m.9": {
        name: "Stadt 15",
        entry: "Du betrittst Stadt 15",
        description: "----",
    },
    "n.9": {
        name: "Stadt 16",
        entry: "Du betrittst Stadt 16",
        description: "----",
    },
};

module.exports = locations;
