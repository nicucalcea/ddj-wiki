// This file is edited by generate_config.py, don't edit by hand. See https://observablehq.com/framework/config for documentation.
export default {
  "title": "Data Journalism Wiki",
  "output": "../docs",
  "cleanUrls": false,
  "theme": "midnight",
  "style": "/src/style.css",
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
          "path": "sources/calendar.html"
        }
      ]
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
          "name": "AI classification in Python",
          "path": "ai/python-classification.html"
        },
        {
          "name": "Data validation in Python",
          "path": "ai/python-validation.html"
        },
        {
          "name": "LLM comparison",
          "path": "ai/llm-comparison.html"
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
    }
  ],
  "footer": "<a href='https://nicu.md/' target='_blank'>Copyright 2024, Nicu Calcea</a>."
}