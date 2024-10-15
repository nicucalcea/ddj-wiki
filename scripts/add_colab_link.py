from bs4 import BeautifulSoup
import re

PAGES_TO_MODIFY = [
    'docs/ai/python-classification-rag.html',
    # Add more pages here as needed
]

def add_colab_link(html_file):
    with open(html_file, 'r', encoding='utf-8') as file:
        soup = BeautifulSoup(file, 'html.parser')

    for toc_actions in soup.find_all('div', class_='toc-actions'):
        ul = toc_actions.find('ul')
        if ul:
            edit_link = ul.find('a', href=lambda href: href and 'github.dev' in href)
            if edit_link:
                github_url = edit_link['href']
                colab_url = re.sub(r'github.dev', 'colab.research.google.com/github', github_url)
                
                new_li = soup.new_tag('li')
                new_a = soup.new_tag('a', href=colab_url, class_="toc-action")
                new_a['data-original-href'] = colab_url
                new_i = soup.new_tag('i', **{'class': 'bi bi-google'})
                new_a.append(new_i)
                new_a.append("Open In Colab")
                new_li.append(new_a)
                
                # Insert the new link after the "Edit this page" link
                edit_link.find_parent('li').insert_after(new_li)

    with open(html_file, 'w', encoding='utf-8') as file:
        file.write(str(soup))

def post_render(input_file, output_file, *args, **kwargs):
    if output_file in PAGES_TO_MODIFY:
        add_colab_link(output_file)

if __name__ == "__main__":
    # For testing purposes
    for page in PAGES_TO_MODIFY:
        add_colab_link(page)
