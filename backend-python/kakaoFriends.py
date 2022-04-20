import requests
import json

url = 'https://kauth.kakao.com/oauth/token'
rest_api_key = 'bf086554820a77f8d2ed930400144038'
redirect_uri = 'https://example.com/oauth'
authorize_code = 'aq4BXmwwlbCo5pXo1PnKHMGQR8DRgWGDGaYcPmZs-lUPA9CKcoJc2mST8hOZwMvP7LcfJworDKgAAAGAKxmk0w'

# https://kauth.kakao.com/oauth/authorize?client_id=bf086554820a77f8d2ed930400144038&redirect_uri=https://example.com/oauth&response_type=code&scope=talk_message,friends

data = {
    'grant_type':'authorization_code',
    'client_id':rest_api_key,
    'redirect_uri':redirect_uri,
    'code': authorize_code,
    }

response = requests.post(url, data=data)
tokens = response.json()
print(tokens)

# ==============================================================
# tokens={'access_token': 'npXrZXi_7pin4viZtWfD-JrVhvIKr6BMwpnVTwopcBMAAAGAKwlOPw', 'token_type': 'bearer', 'refresh_token': 'Ki23P9tpHBKxzTubH7uICjryB59Lb7wMUh7qswopcBMAAAGAKwlOPQ', 'expires_in': 21599, 'scope': 'friends', 'refresh_token_expires_in': 5183999}
print(tokens["access_token"])

friend_url = "https://kapi.kakao.com/v1/api/talk/friends"

# GET /v1/api/talk/friends HTTP/1.1
# Host: kapi.kakao.com
# Authorization: Bearer {ACCESS_TOKEN}

headers={"Authorization" : "Bearer " + tokens["access_token"]}

result = json.loads(requests.get(friend_url, headers=headers).text)

print(type(result))
print("=============================================")
print(result)
print("=============================================")
friends_list = result.get("elements")
print(friends_list)
# print(type(friends_list))
print("=============================================")
print(friends_list[0].get("uuid"))
friend_id = friends_list[0].get("uuid")
print(friend_id)