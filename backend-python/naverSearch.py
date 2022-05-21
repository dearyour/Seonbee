import requests
import urllib

client_id="mlfKASqUh16HyqLwcOJt"
client_secret="zMezMl3SPr"

query = "케이크"
query = urllib.parse.quote(query)

display = "5"

url = "https://openapi.naver.com/v1/search/shop?query=" + query + "&display=" + display
# url = "https://openapi.naver.com/v1/search/shop"

request = urllib.request.Request(url)
request.add_header('X-Naver-Client-Id', client_id)
request.add_header('X-Naver-Client-Secret', client_secret)

response = urllib.request.urlopen(request)
print(response.read().decode('utf-8'))
