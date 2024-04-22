// This file is edited by generate_config.py, don't edit by hand. See https://observablehq.com/framework/config for documentation.
export default {
  "title": "Data Journalism Wiki",
  "output": "../docs",
  "cleanUrls": false,
  "theme": "midnight",
  "pages": [
    {
      "name": "Home",
      "path": "index.html"
    },
    {
      "name": "Data Sources",
      "open": true,
      "pages": [
        {
          "name": "Data Sources",
          "path": "sources/index.html"
        },
        {
          "name": "Academic Sources",
          "path": "sources/academic.html"
        },
        {
          "name": "Data Calendar",
          "path": "sources/data-calendar.html"
        }
      ]
    },
    {
      "name": "Toolbox",
      "path": "toolbox/index.html"
    },
    {
      "name": "Awards",
      "path": "awards/index.html"
    },
    {
      "name": "AI",
      "open": true,
      "pages": [
        {
          "name": "AI for journalists",
          "path": "ai/index.html"
        },
        {
          "name": "AI in Google Sheets",
          "path": "ai/google-sheets.html"
        },
        {
          "name": "LLM comparison",
          "path": "ai/llm.html"
        }
      ]
    }
  ]
}