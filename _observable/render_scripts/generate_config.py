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
    "pages": [
        {
            "name": "Menu",
            "pages": []
        }
    ]
}

# Populate the pages data
for nav_item in navbar_left:
    if 'menu' in nav_item:
        for sub_item in nav_item['menu']:
            path = sub_item['href'].replace('.qmd', '.html')
            output_json['pages'][0]['pages'].append({
                "name": sub_item['text'],
                "path": path
            })
    else:
        path = nav_item['href'].replace('.qmd', '.html')
        output_json['pages'][0]['pages'].append({
            "name": nav_item['text'],
            "path": path
        })

# Write the JSON to _observable/observablehq.config.js
with open("_observable/observablehq.config.js", 'w') as f:
    f.write("// This file is edited by generate_config.py, don't edit by hand. See https://observablehq.com/framework/config for documentation.\n")
    f.write("export default ")
    json.dump(output_json, f, indent=2)