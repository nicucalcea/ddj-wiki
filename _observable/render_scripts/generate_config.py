import yaml
import json

# Read the _quarto.yml file
with open("_quarto.yml", 'r') as stream:
    try:
        config = yaml.safe_load(stream)
    except yaml.YAMLError as exc:
        print(exc)

# Extract the required data
title = config['website']['title']
output_dir = config['project']['output-dir']
navbar_left = config['website']['navbar']['left']

# Create the JSON structure
output_json = {
    "title": title,
    "output": "../" + output_dir,
    "cleanUrls": False,
    "theme": "midnight",
    "pages": []
}

# Populate the pages data
for nav_item in navbar_left:
    page = {
        "name": nav_item['text'],
    }

    if 'menu' in nav_item:
        page['open'] = True
        page['pages'] = []

        for sub_item in nav_item['menu']:
            path = sub_item['href'].replace('.qmd', '.html')
            page['pages'].append({
                "name": sub_item['text'],
                "path": path
            })
    else:
        path = nav_item['href'].replace('.qmd', '.html')
        page['path'] = path

    output_json['pages'].append(page)

# Write the JSON to _observable/observablehq.config.js
with open("_observable/observablehq.config.js", 'w') as f:
    f.write("// This file is edited by generate_config.py, don't edit by hand. See https://observablehq.com/framework/config for documentation.\n")
    f.write("export default ")
    json.dump(output_json, f, indent=2)