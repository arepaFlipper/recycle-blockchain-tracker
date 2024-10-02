import requests

url = 'http://localhost:3001'

response = requests.get(url)

if response.status_code == 200:
    print("Request successful!")
    print(response.text)  # Print the response content
else:
    print(f"Request failed with status code: {response.status_code}")

