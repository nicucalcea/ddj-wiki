library(tidyverse)

gapminder <- read_csv("docs/viz/data/gapminder_flourish.csv") |>
    janitor::clean_names() |>
    pivot_wider(names_from = year, values_from = c(gdp_per_capita_current, life_expectancy, population))

# write_csv(gapminder, "_observable/docs/viz/data/gapminder.csv")

cat(format_csv(gapminder))