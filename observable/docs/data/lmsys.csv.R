library(tidyverse)
library(rvest)

llm_price <- read_csv("docs/data/llm-price.csv")

# Read in the data
# https://chat.lmsys.org/?leaderboard
lmsys <- read_html("docs/data/lmsys.html") |>
    html_elements("head script") |>
    pluck(2) |>
    # retrieve the text
    html_text() |>
    # extract JSON from the script
    str_remove("window.gradio_config = ") |>
    str_remove(";$") # remove the trailing semicolon

lmsys_json <- jsonlite::parse_json(lmsys) |>
    pluck("components") |>
    # filter to the component where id == 151
    keep(~ .x$type == "dataframe") |>
    pluck(1) |>
    pluck("props") |>
    pluck("value") |>
    pluck("data") |>
    tibble() |>
    # set column names
    set_names(c("lmsys")) |>
    unnest_wider(1, names_sep = "_") |>
    # extract the text from HTML
    mutate(
        name = str_extract(lmsys_2, "(?<=>).*(?=</a>)"),
        link = str_extract(lmsys_2, 'href="([^"]+)"') |> str_remove("href=") |> str_remove_all('"')
    ) |>
    select(name, arena_elo = lmsys_3, org = lmsys_6, licence = lmsys_7, knowledge_cutoff = lmsys_8, link) |>
    inner_join(llm_price, by = join_by(name))


# clipr::write_clip(lmsys_json |> filter())

cat(format_csv(lmsys_json))
