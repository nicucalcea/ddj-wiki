---
title: Patching Datawrapper
toc: false
---

You can set up Datawrapper to update a chart based on some in-browser triggers.

Let's take a simple scatterplot.

<div style="min-height:436px"><script type="text/javascript" defer src="https://datawrapper.dwcdn.net/hhddC/embed.js?v=11" charset="utf-8"></script><noscript><img src="https://datawrapper.dwcdn.net/hhddC/full.png" alt="" /></noscript></div>

While this is nice and tells a story, it's not ideal for exploring data. Can you easily find your country in the chart? Can you change one of the axis? Can you see how the data changes over time?

# Patching Datawrapper

Instead of the traditional iframes, you can [embed Datawrapper charts with Web Components](https://blog.datawrapper.de/web-component-embedding/). This has several advantages, mainly in terms of performance, but for the purposes of this tutorial, it allows us to make changes to the chart based on user input.

First, we'll load some JS code that makes everything possible. Add the following to your HTML file (you can find the full code [here](../src/datawrapper.js)):

```js echo
import {DataWrapper} from '../src/datawrapper.js';
```

Next, we add the ID of our Datawrapper chart and import it. We'll display the chart later.

```js echo
const scatterId = 'hhddC';
const scatter = new DataWrapper(scatterId, 'scatter-plot-1');
```

We'll need some input. I'm using the `Inputs` Observable module to create a nice dropdown menu, but you can crate it with whatever framework you like or in vanilla JS.

```js echo run=false
import * as Inputs from "npm:@observablehq/inputs";

const countrySelect = view(
  Inputs.select(
    [
      "Afghanistan", "Albania", "Algeria", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Cote d'Ivoire", "Croatia", "Curacao", "Cyprus", "Czechia", "Democratic Republic of Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Egypt", "Equatorial Guinea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Jordan", "Kenya", "Kiribati", "Kyrgyzstan", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Lithuania", "Luxembourg", "Macao", "Madagascar", "Malawi", "Mali", "Malta", "Marshall Islands", "Mauritius", "Micronesia (country)", "Moldova", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vietnam", "Zambia", "Zimbabwe", "Japan", "Kazakhstan", "Mexico", "Norway", "Armenia", "Azerbaijan", "Cyprus", "Laos", "Russia", "Turkey", "East Timor", "Ecuador", "El Salvador", "Georgia", "Germany", "Haiti", "Honduras", "Iran", "Kazakhstan", "Malaysia", "Maldives", "Mauritania", "Poland", "Puerto Rico", "Samoa", "Serbia", "Switzerland", "Georgia"
    ],
    {label: "Country: "}
  )
);
```

We also need a bit of code that listens to changes in the dropdown menu and pushes changes to the chart.

```js echo
if (countrySelect) {
    scatter.updateViz(`metadata.visualize.add-labels`, [countrySelect]);
    scatter.updateViz(`title`, `Income vs life expectancy in ${countrySelect}`);
    }
```

Finally, let's add a `scatter-plot-1` div to our HTML. This is where the chart will be insterted. For convenience, we'll also copy the `countrySelect` dropdown menu again.

``` 
<div id="scatter-plot-1"></div>
```

```js
const countrySelect = view(
  Inputs.select(
    [
  "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Antigua and Barbuda",
  "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas, The", "Bahrain",
  "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia",
  "Bosnia and Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei Darussalam",
  "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Cayman Islands",
  "Central African Republic", "Chad", "Channel Islands", "Chile", "China", "Colombia", "Comoros",
  "Congo, Dem. Rep.", "Congo, Rep.", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt, Arab Rep.", "El Salvador",
  "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Faroe Islands", "Fiji", "Finland",
  "France", "French Polynesia", "Gabon", "Gambia, The", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece",
  "Greenland", "Grenada", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
  "Hong Kong SAR, China", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Rep.", "Iraq", "Ireland",
  "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
  "Korea, Dem. People's Rep.", "Korea, Rep.", "Kosovo", "Kuwait", "Kyrgyz Republic", "Lao PDR", "Latvia",
  "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao SAR, China",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania",
  "Mauritius", "Mexico", "Micronesia, Fed. Sts.", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco",
  "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand",
  "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Northern Mariana Islands", "Norway", "Oman", "Pakistan",
  "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Puerto Rico", "Qatar", "Romania", "Russian Federation", "Rwanda", "Samoa", "San Marino", "Sao Tome and Principe",
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten (Dutch part)",
  "Slovak Republic", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka",
  "St. Kitts and Nevis", "St. Lucia", "St. Martin (French part)", "St. Vincent and the Grenadines", "Sudan",
  "Suriname", "Sweden", "Switzerland", "Syrian Arab Republic", "Tajikistan", "Tanzania", "Thailand",
  "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkiye", "Turkmenistan",
  "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
  "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela, RB", "Virgin Islands (U.S.)",
  "West Bank and Gaza", "Yemen, Rep.", "Zambia", "Zimbabwe"
],
    {label: "Country: "}
  )
);
```

<div id="scatter-plot-1"></div>

You can find a list of updateable properties [on the Datawrapper website](https://developer.datawrapper.de/docs/chart-properties) or [see the properties of your own chart here](https://api.datawrapper.de/v3/charts/hhddC) (replace the ID with your chart ID).

<!-- # Animating charts in Datawrapper

Let's build on the previous example.

First, let's build a slider.

<div id="time-slider">
</div>

```js echo
let timeSlider = view(Inputs.range([1960, 2021], {step: 1, value: 1960}));
```

```js echo
const scatterAnimated = new DataWrapper('hhddC', 'scatter-plot-2');
```

Finally, let's add a `scatter-plot-2` div to our HTML. This is where the chart will be insterted. For convenience, we'll also copy the `countrySelect` dropdown menu again.

``` 
<div id="scatter-plot-2"></div>
```

<div id="scatter-plot-2"></div>

```js echo
if (timeSlider) {
    scatterAnimated.updateViz(`title`, `Income vs life expectancy in ${timeSlider}`);
    scatterAnimated.updateViz('metadata.axes.x',  `gdp_per_capita_current_${timeSlider}`);
    scatterAnimated.updateViz('metadata.axes.y',  `life_expectancy_${timeSlider}`);
    scatterAnimated.updateViz('metadata.axes.size',  `population_${timeSlider}`);
    }
``` -->
