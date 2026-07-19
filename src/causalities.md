---
title: Custom Settings Editor
description: "The in-game editor isn't very precise. View, edit, and export custom settings for Casualties: Unknown runs."
---

# Custom Settings Editor
In the game [Causalities: Unknown](https://store.steampowered.com/app/4576490/Casualties_Unknown/), you can configure custom settings for a run.
The in-game editor for these settings rounds options to the nearest multiple of 0.1, and sometimes I don't want to launch the game just to make a preset, so I made this tool to do it online with full precision.

You can also use this to set values outside the limits the in-game editor has, which seems to work as expected but could have resource-intensive or unplayable results.

## Presets
<button id="import-button">Import from text box</button>
<textarea id="input-area"></textarea>
<button id="export-button">Export to text box</button>

## Settings
<script>
const OPTIONS = {
    unchipped: {
        name: "Unchipped",
        desc: "Disables your health panel, forcing you to put more effort into figuring what specific ailments you have. Enables line of sight.",
        type: "boolean",
    },
    baselootdensity: {
        name: "Loot density",
        desc: "How much loot appears in every layer. Affects things like drop capsules, lifepods, crates",
        type: "real",
    },
    lootmultiplier: {
        name: "Distance loot multiplier",
        desc: "Loot density is multiplied by this for each layer you cross\n\nIn other words, if you set it to e.g. 0.5x, the amount of loot would be halved every time you descend a layer",
        type: "real",
    },
    basetrapdensity: {
        name: "Trap density",
        desc: "How many traps appear in every layer. Affects things like mechanical traps, enemies, other hazards.",
        type: "real",
    },
    trapincrease: {
        name: "Distance trap increase",
        desc: "This number is added to the trap density for each layer you cross\n\nIn other words, if you set it to e.g. 0.5x, the trap amount would go from 1x -> 1.5x -> 2x and so on",
        type: "real",
    },
    ambientlight: {
        name: "Ambient light",
        desc: "How much should areas without a direct light source be illuminated",
        type: "choice",
        choices: ["Pitch black", "Enough to see", "Bright"],
    },
    timelimit: {
        name: "Layer time limit",
        desc: "In minutes, how long can you stay in every layer before punishment",
        type: "integer",
    },
    startingsupplies: {
        name: "Starting supplies",
        desc: "What items you start with",
        type: "choice",
        choices: ["Nothing", "Flashlight", "Full kit"],
    },
    xpgain: {
        name: "Experience gain",
        desc: "Multiplier for how much skill experience you gain",
        type: "real",
    },
    metabolismrate: {
        name: "Metabolism rate",
        desc: "How fast your hunger/thirst/sickness/weight drains.",
        type: "real",
    },
    healingrate: {
        name: "Healing rate",
        desc: "How fast your injuries heal. Affects muscle/skin regeneration, blood clotting, blood regen, fractures, dislocations and brain damage",
        type: "real",
    },
    fracturepain: {
        name: "Fracture pain rate",
        desc: "How much limbs hurt when used while dislocated/fractured",
        type: "real",
    },
    bleedrate: {
        name: "Bleeding rate",
        desc: "How quickly your blood volume lowers from bleeding wounds",
        type: "real",
    },
    infectionspeed: {
        name: "Infection speed",
        desc: "How fast infections progress/decrease and how fast they kill. Also affects how long antiseptics last",
        type: "real",
    },
    infectionchance: {
        name: "Infection chance",
        desc: "How likely you are to catch infections from wounds",
        type: "real",
    },
    fibrillationrate: {
        name: "Fibrillation rate",
        desc: "How fast heart rhythm fibrillation progresses. Higher number = die faster",
        type: "real",
    },
    moodnormalizationrate: {
        name: "Mood normalization rate",
        desc: "How fast your mood crawls towards 0. Higher values will make it harder to remain sad or happy.",
        type: "real",
    },
    bonuslimbarmor: {
        name: "Bonus limb armor",
        desc: "How much more damage resistances your limbs innately have. A value of 1 will halve all received damage",
        type: "real",
    },
    staminaregen: {
        name: "Stamina regeneration",
        desc: "How fast your stamina regenerates after being used",
        type: "real",
    },
    attackdamage: {
        name: "Attack damage",
        desc: "How much damage you do with your swings",
        type: "real",
    },
    minigamehandshake: {
        name: "Minigame hand shaking",
        desc: "How much your hand shakes during minigames while in pain",
        type: "real",
    },
    sleepcyclespeed: {
        name: "Sleep cycle speed",
        desc: "How fast your energy drains when awake and regenerates when asleep",
        type: "real",
    },
    encumbrancecap: {
        name: "Encumbrance cap",
        desc: "How much the player can hold before becoming encumbered",
        type: "real",
    },
    strokes: {
        name: "Enable strokes",
        desc: "Determines if you can get a stroke during hypertensive crisis",
        type: "boolean",
    },
    braindamagefx: {
        name: "Brain damage effects",
        desc: "Determines if brain damage causes periodic fits",
        type: "boolean",
    },
    forcesleep: {
        name: "Force sleep",
        desc: "Should the player be forced unconscious when their energy reaches 0",
        type: "boolean",
    },
    lowmoodevents: {
        name: "Low mood events",
        desc: "Should the player take special action at critically low mood",
        type: "boolean",
    },
    liquidpushing: {
        name: "Liquid pushing",
        desc: "Determines if moving liquid tiles push the player and objects around",
        type: "boolean",
    },
    disfigurement: {
        name: "Enable disfigurement",
        desc: "Determines if your character can permanently lose their facial features",
        type: "boolean",
    },
    nosleeprestrictions: {
        name: "No sleep restrictions",
        desc: "Can the player always sleep, even when not tired and when in pain/sick/etc?",
        type: "boolean",
    },
    infinitelaststand: {
        name: "Infinite last stands",
        desc: "Determines if you can roll for last stand more than once during a run",
        type: "boolean",
    },
    traderchance: {
        name: "Trader chance",
        desc: "How often traders appear in lifepods",
        type: "real",
    },
    traderitemamount: {
        name: "Trader item amount",
        desc: "Multiplier for how many items traders generally spawn with",
        type: "real",
    },
    traderrepoffset: {
        name: "Trader reputation offset",
        desc: "How much bonus reputation to add/remove when meeting traders",
        type: "real",
    },
    itemdecayrate: {
        name: "Item decay rate",
        desc: "How fast things like food, bags and light sources decay",
        type: "real",
    },
    lockpickprecision: {
        name: "Lockpicking leniency",
        desc: "How wide the precision angle is during lockpicking minigames",
        type: "real",
    },
    layermodifierchance: {
        name: "Layer modifier chance",
        desc: "How likely is a layer modifier to appear, per-layer",
        type: "real",
    },
    timebetweenearthquakes: {
        name: "Time between earthquakes",
        desc: "How long, on average, it will take for an earthquake to appear",
        type: "real",
    },
    temperatureoffset: {
        name: "Ambient temperature offset",
        desc: "How much warmer/colder should the environment be on average",
        type: "real",
        min: -1000,
    },
    oreamount: {
        name: "Ore amount",
        desc: "How much copper/ilmenite to create in each layer",
        type: "real",
    },
    debugworld: {
        name: "Debug world",
        desc: "If on, makes the world much smaller to speed up generation. Not made for normal gameplay",
        type: "boolean",
    },
};

const PRESETS = {
    "Normal": "H4sIAAAAAAAACoWUTW4bMQyF7zLroEiaoovcoGcouqAkaoaw/kJRddyidy/lLDy2IXnhzfgD+cj3xJ9/lx+C8WV5W1qyG5WCbnk6f/u6vHkIFf89XRgDFUPO4jBVktOFfPnyvOc6E1sQKoGQh1gvJwzlUbnOULKMyl+g52sIoiFMEmjdZAdd1aGIgSLt/v9+U6UKsFBaaytde91p2mMfZQVKQ8ERBUwOVCOD4BDbEIL2mjKewUpjLLN+JiC6aRlKHq1QTrXg3uIRZjdIdqKKDFMI0NFp35izS5mjDvrnMW1yalUdMsAx89BqNSlSAsYVxzsBEbAHBxHWiTxKtEJEndbVDQ5jsuqKiz3ZgPMNYrItGu7bs1DG5YTzYR8v4Xb91FgN/1TvP8aYz2zxrG3MhHzsNuBvfR6TjoHeG7nS6qaZHGOOqqdVExm13BhL+ayKUSelz+RNDovmTp0QDFBF3U2zI6TXwCHfBvT19e5mKKUlI8Tc9krvj4uC+sCy93qOhqHrpZx6epomOGR7KKQ/RktVpx6TcEJNuSNP99N8u2neL5dBOSIm1AO1vTe4Ss/tTBgLqk516cFUWY/qfD8OTVuPmcOdJ7/+Awu79/U+BgAA",
    "Relaxed": "H4sIAAAAAAAACn2U3W7bMAyF38XXRRCnaFr0DfYMwy5oibaJ6K+U1DQb9u6jE2CRlNoXQYDkw+EhD8Wff7ofCW3fvXfZqZlCQN09XX87dO8jmIh/n+7MABGN90mji5Qud7Lf9S8luEA2m0TBEHLJ7Vu9xBAe9Pa7t5JbGHKKUfgSqsTADoQuGZrmVFSsdMiiIUvl/4dGJibgRG6KOSzm4x09lNhXmIDc+gQsJhi8oWgZUmX6tcRmBCPFaqbfVaVGBpUyY6gK7nfHSmkwiPqhVuWJ3IgqkXcxYJlz4+k/pmZwakNvpIHJGFjYtnKVn/VeO89Wev39DS39VrqDdzlKTgOw9bwauCRlyQHjhHUQ1VakBOqkwcKEq3soMjSBRelXxxlOVSfHY1VUxhzURRlshthIolPZDrwMUEFYxWJifyqXLHGunxxL6jf749c6NnpWePW28XyNPy9J4Kc8k42Shj4y6ZDjLJu5jmmKI02yl1bk1jHnr7YYpVW6bd+GRdk9ySKhgZgkX7d1jeQqaOR2SZ+f6wnfKJG0YH0unfbfgfLM/DjKWSq4lxpctLSketl+bcarUyD5MCqK0ndZuSbhgrLpmkZ67Ke9T8sNGzCdER3KpZo/MlQL1GjLV0AxKjm1fTXCXs7r9oQ0Dnk6ezYPqfz6B0TlWSJJBgAA",
    "Paradise": "H4sIAAAAAAAACn2VS47bMAyG75L1IEjSpi3mBj1DMQtaom0ieg0lNZMWvXvpBGhEpc4iG+f3x9dP+sfvzfeCfr953dRgZkoJ7ebl+uyweR3BZfzzctcMkNHFWCyGTOVyV+63x1a3aHx1hZIj5Fa263GFIT3gdttPireIKBhGeaFVKRr4gTAUR9Nc7qKD4pBHR56a//ffOkwuwIXClGtass8rqI80AYW2tINK2WOBITrKnqGopL+2shnBSTCt6bo5MphSGZMKuNt+Vr10iPZpKAojmkIx5ITtlHc62j+ZmSEYjdNp0cDkHCzaPvAX1YoYbYjspdJf/1H3nRtiqFmmNAD7yC1V62RQngIwTqjnoExRCpiTBQ/TeoMFQxN4lIJtnuGkSlG4LF1O5mIcdk3snI3BVD/w0kADaTVwLhxPrcUKV71wLDO/ZT9+rMvGyAavuT1ZXhfPyyTwpyzJk5CO3ivZVPMsvnyCs5RHmsSWXnjruBCveTFKrXSz3xOomE9mUdBBLjLfYNfBchMscm/SY7fNN5UQPfhY20R7292UsmVxHOUsNWt/1MgFZmWsl9703Qk0p0TyYzSUpewG2CnhguJ0SyM91rPv65ELNmA5IwaUOzW/V1AGOnRy9AklTxlTX1YHjnJcHzqkFBaHOp0ju4cvxNtf80MR3EcGAAA=",
    "Desolate": "H4sIAAAAAAAACn2UTY7bMAyF7+L1NEjSTlHMDXqGYhaURNtE9DcU1Uxa9O6lk0VsJ/IiG+fD48974q+/3U/BcOjeuhrtSDmj616u347dWw++4L+XO2OgoE9JHMZCcrmT+923OTcxoXqh7An5jh12+7WcMOQHucPudc5NDEXLqPy85kIMgiGM4mkYZQYtdCigp0Cz/7+vVIoAC8Wh1Dz1XhpKn3kAis3BAgqY5KkEBsEmNiJ4rbXJ9AxWKmNe1TsuNmQ8otvUodijFUqxZJx73MLsCNFutEWGyXuY0M26ISUXEwed9M8Ter902qRYi1pkgEPiptfqUqAIjAO2TQARsCcHAYaN9ijSAAF1WldGOM3I46qmrjjbi/W4vUGMtgbD0/Ys5CZWhNNpni/hunxrrI7fuu8/21if2OK1tzbj03myAX/r+9io6Omjksu1jBrKNuao9DRoJIPKtbGYrl0x6qR0S97GZdHcqROCHoqou3HrCuk5cMgPAV1l5EapZICQ6rzTr89AfWGp7/Ue3bkva8lJzKmrl83E+2RPmfTHaKno3G0SLqg5d9TTs3nWA+n1MihnxIh6pMaPCosA7Xc/FjiGjNqoGvU42OtSOulpXS1p9TAdmjqcE/sHY97/A8TGNctEBgAA",
    "Unchipped": "H4sIAAAAAAAACoWUTW7jMAyF7+J1MUgnXfUGc4aiC0qibSL6K0U1TQdz96HTRRwbUhbZOB8ef94T3/4OfwTD8/A61Ghnyhnd8HT99nt4Fa747+mGGCjoUxKHsZBcbuDzr8OaW5hQvVD2hNzEFjlhyI/kFoaiZVT+Bh3uIQiGMIqnaZYVdKdDAT0FWv1/PGxkigALxanUvDRfGlJfeQKKzY4DCpjkqQQGwSY2I3it1WVGBiuVMffqGY/oujIUR7RCKZaMa4tbmJ0h2k5XZJi8hwXt1g0puZg46KDfj2mTYi1qkQEOiZteq0mBIjBO2N4JiIA9OQgwddqjSBME1GldmeHUJouuONuL9djfIEZbg+FlexZyW044ndbx2r01VsN/uh+/2tiY2OK1tzbj03mxAT/1fXQqevqo5HIts2ayjTkqI02ayKBybSyma1eMOin9JO8Gj+ALbnKnTgh6KKLuRtdh9Rw45G1Aj8fd0VBKJQOEVNed7q+LgvrA0jjqPWqGbpFy6umlm2Cf7CmT/hgtFZ26TcIFNeWORtpP87Ipvpwug3JGjKgHav6ocJee7UwYMmqf6tKDqZJe1f5+HJo6nRP7nSfv/wGp2GlRPgYAAA==",
};

async function importSettings(text) {
    const data = await new Response(
        new Blob([Uint8Array.fromBase64(text)]).stream().pipeThrough(new DecompressionStream("gzip"))
    ).json();
    for (const {Item1: name, Item2: value} of data) {
        if (OPTIONS[name].type === "boolean") form[name].checked = value;
        else form[name].value = value;
    }
}

async function exportSettings() {
    const obj = [];
    for (const [name, opt] of Object.entries(OPTIONS)) {
        obj.push({Item1: name, Item2: opt.type === "boolean" ? form[name].checked : +form[name].value});
    }
    const bytes = await new Response(
        new Blob([JSON.stringify(obj)]).stream().pipeThrough(new CompressionStream("gzip"))
    ).bytes()
    return bytes.toBase64();
}

const importButton = document.getElementById("import-button");
const exportButton = document.getElementById("export-button");
const inputArea = document.getElementById("input-area");

importButton.addEventListener("click", () => importSettings(inputArea.value));
exportButton.addEventListener("click", async () => inputArea.value = await exportSettings());

for (const [name, preset] of Object.entries(PRESETS)) {
    const button = document.createElement("button");
    button.textContent = name;
    button.addEventListener("click", () => importSettings(preset));
    importButton.before(button, " ");
}

const form = document.createElement("form");

for (const [id, option] of Object.entries(OPTIONS)) {
    const para = document.createElement("p");

    const label = document.createElement("label");
    label.textContent = ` ${option.name}`;
    label.setAttribute("title", option.desc);
    para.append(label);

    let input;
    if (option.type === "boolean") {
        input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        label.prepend(input);
    } else if (option.type === "real") {
        input = document.createElement("input");
        input.setAttribute("type", "number");
        input.setAttribute("step", "0.01");
        input.setAttribute("min", option.min ?? "0");
        input.setAttribute("max", option.max ?? "1000");
        label.after(input);
    } else if (option.type === "integer") {
        input = document.createElement("input");
        input.setAttribute("type", "number");
        input.setAttribute("min", option.min ?? "0");
        input.setAttribute("max", option.max ?? "1000");
        label.after(input);
    } else if (option.type === "choice") {
        input = document.createElement("select");
        for (const [i, choice] of option.choices.entries()) {
            const opt = document.createElement("option");
            opt.textContent = choice;
            opt.setAttribute("value", i.toString());
            input.append(opt);
        }
        label.after(input);
    }

    input.setAttribute("name", id);

    form.append(para);
}

importSettings(PRESETS["Normal"]);
document.currentScript.before(form);
</script>
