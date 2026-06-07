import requests
from bs4 import BeautifulSoup

url = "https://aioncodex.com/us/items/"

html = requests.get(url).text

print(html)
