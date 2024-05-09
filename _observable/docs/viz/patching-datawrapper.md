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

First, we'll load some JS code that makes everything possible. Add the following to your HTML file:

```js echo
import {DataWrapper} from '../src/datawrapper.js';
```

Next, we add the ID of our Datawrapper chart and import it. We'll display the chart later.

```js echo
const DATAWRAPPER_ID = 'hhddC';
const dataWrapper = new DataWrapper(DATAWRAPPER_ID);
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
    dataWrapper.updateViz(`metadata.visualize.add-labels`, [countrySelect]);
    dataWrapper.updateViz(`title`, `Income vs life expectancy in ${countrySelect}`);
    }
```

Finally, let's add a `container` div to our HTML. This is where the chart will be insterted. For convenience, we'll also copy the `countrySelect` dropdown menu again.

``` 
<div id="container"></div>
```

```js
const countrySelect = view(
  Inputs.select(
    [
      "Afghanistan", "Albania", "Algeria", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Cote d'Ivoire", "Croatia", "Curacao", "Cyprus", "Czechia", "Democratic Republic of Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Egypt", "Equatorial Guinea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Jordan", "Kenya", "Kiribati", "Kyrgyzstan", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Lithuania", "Luxembourg", "Macao", "Madagascar", "Malawi", "Mali", "Malta", "Marshall Islands", "Mauritius", "Micronesia (country)", "Moldova", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vietnam", "Zambia", "Zimbabwe", "Japan", "Kazakhstan", "Mexico", "Norway", "Armenia", "Azerbaijan", "Cyprus", "Laos", "Russia", "Turkey", "East Timor", "Ecuador", "El Salvador", "Georgia", "Germany", "Haiti", "Honduras", "Iran", "Kazakhstan", "Malaysia", "Maldives", "Mauritania", "Poland", "Puerto Rico", "Samoa", "Serbia", "Switzerland", "Georgia"
    ],
    {label: "Country: "}
  )
);
```

<div id="container"></div>

