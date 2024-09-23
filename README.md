This is a website with some resources for the **Introduction to Data Journalism** course at **City, University of London**.

It is built with [Quarto](https://quarto.org/) and hosted on GitHub Pages. It uses [Reveal.js](https://revealjs.com/) for slides and [Observable Framework](https://observablehq.com/framework/) for interactive pages.

## Integrating Observable

I've been experimenting with the new Observable Framework and loving it, but it's not a mature enough platform to build a whole site on. However, it's great for interactive visualisations and small projects.

This is a quick and dirty way to integrate Observable Framework into my existing Quarto site. It's not perfect and you may find a better way to do it, but it does the job.

### Step 1: Create a new Observable project

Use the normal process to create a new project. Name the folder `_observable` and put it in the root of your Quarto project.

### Step 2: Edit the Quarto configuration

In your `_quarto.yml` file, add the following lines:

```yaml
post-render: 
    - _observable/render_scripts/generate_config.py
    - _observable/render_scripts/build.py
```

### Step 3: Create the build scripts

In `_observable`, create a new folder called `render-scripts`. In this folder, create two files: `generate_config.py` and `build.py`.

The first file will generate a new configuration file for the Observable project. This will ensure the title and navigation bar are the same as the Quarto site.

You can see the full script in `_observable/render_scripts/generate_config.py`.

The second one will run the Observable build process. This is triggered when you run `quarto render`. You'll have to adapt it for Unix systems.

```bat
@echo off
cd "_observable"
npm run build
```

### Step 4: Run the build

Run `quarto render`. If it's all set up correctly, the Observable build step will run just after the Quarto render, and you will have content from both in the same site.

## To-do
- [ ] Add Observable pages to sitemap and search
- [ ] Share CSS between Quarto and Observable for more consistent styling