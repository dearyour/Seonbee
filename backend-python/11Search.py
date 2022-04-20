import requests
import urllib

key="5a6c695f99ffec892dfe0dadb718f090"
query = "물티슈"
query = urllib.parse.quote(query)


url = "https://openapi.11st.co.kr/openapi/OpenApiService.tmall?key="+key+"&apiCode=ProductSearch&keyword="+query+"&sortCd=CP"

request = urllib.request.Request(url)
# request.add_header('X-Naver-Client-Id', client_id)
# request.add_header('X-Naver-Client-Secret', client_secret)

response = urllib.request.urlopen(request)
# print(response)

print(response.read().decode('cp949'))
# print(response.read().decode('utf-8'))