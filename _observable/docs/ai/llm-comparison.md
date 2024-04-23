---
title: LLM comparison
toc: false
---

```js
import * as Plot from "npm:@observablehq/plot";
```

There are many Large Language Models out there, with varying capabilities and costs. This page aims to provide a comparison of some of the most popular models.

*Data valid as of 2024-04-18.*

```js
const lmsys = await FileAttachment("data/lmsys.csv").csv({ typed: true });
```


## What do you need?

```js
const inputType = view(Inputs.radio(["tokens", "words", "characters"], {label: "Input type", value: "tokens"}));

const tokensInput = view(
  Inputs.number({
    id: "tokensInput",
    label: "Input",
    placeholder: "How many input tokens do you need?",
    value: 15000
  })
);


const tokensOutput = view(
  Inputs.number({
    label: "Output",
    placeholder: "How many output tokens do you need?",
    value: 150
  })
);


const apiCalls = view(
  Inputs.number({
    label: "API calls",
    placeholder: "How many API calls?",
    value: 10000
  })
);

// const qualPreference = view(Inputs.range([0, 1], {label: html`Quality over price?`, step: .1}));
```

```js
// work out a divisor for words and characters
let divisor
if (inputType === "words") {
  divisor = 1 / 0.75
} else if (inputType === "characters") {
  divisor = 4
} else {
  divisor = 1
}
```

```js
// add new "cost" column and filter table if over token limit
const lmsys_cost = lmsys.map(d => ({
  ...d, 
  cost: (d.input_1m_tokens * tokensInput / 1000000 + d.output_1m_tokens * tokensOutput / 1000000) * apiCalls / divisor,
  cost_per_elo: d.arena_elo / ((d.input_1m_tokens * tokensInput / 1000000 + d.output_1m_tokens * tokensOutput / 1000000) * apiCalls / divisor)
})).filter(d => (tokensInput + tokensOutput) < d.context);
```

```js
Inputs.table(lmsys_cost, {
  columns: [
    "name",
    "arena_elo",
    "org",
    "context",
    "cost",
    "cost_per_elo"
  ],
  header: {
    name: "LLM",
    arena_elo: "ELO score",
    org: "Organisation",
    context: "Context window",
    cost: "Cost",
    cost_per_elo: "Score"
  },
  format: {
    cost: (x) => `$${Number(x).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
    cost_per_elo: sparkbar(d3.max(lmsys_cost, d => d.cost_per_elo)),
  },
  sort: "cost_per_elo", reverse: true
})
```

```js
function sparkbar(max) {
  return (x) => htl.html`<div style="
    background: var(--accent);
    color: white;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    font: 10px/1.6 var(--sans-serif);
    width: ${100 * x / max}%;
    float: right;
    padding-right: 3px;
    box-sizing: border-box;
    overflow: visible;
    display: flex;
    justify-content: end;">${x.toLocaleString("en-US")}`
}
```

The score column is calculated by dividing the ELO score by the cost. The higher the score, the better deal you get for the money.

<br>

### Where's the sweet spot?

The dots in the top left corner are the most cost-effective models.

The further to the right, the more expensive the model is. The higher up, the better the model is at doing various tasks.

```js
Plot.plot({
  grid: true,
  inset: 10,
  x: {label: "Cost ($)"},
  y: {label: "ELO rating"},
  marks: [
    Plot.frame({strokeOpacity: 0.2}),
    [
      "top-left", "top-right", "bottom-right", "bottom-left" // corners
    ].map((anchor, index) => [
      Plot.text([["cheap & powerfull"], ["expensive & powerfull"], ["expensive & weak"], ["cheap & weak"]][index], {frameAnchor: anchor, anchor})
    ]),
    Plot.dot(lmsys_cost, {
      x: "cost",
      y: "arena_elo",
      stroke: "org",
      size: 100,
      channels: {name: "name"},
      tip: true
      })
      ]
})
```