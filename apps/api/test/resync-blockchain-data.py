import requests

url = 'http://localhost:3001/'
url += 'resync-blockchain-data'

headers = {
    'x-api-secret': 'dummy-api-secret'
}

response = requests.post(url, headers=headers)

if response.status_code == 201:
    print("Request successful!")
    print(response.json())
else:
    print(f"Request failed with status code: {response.status_code}")
