import requests
files = {'file':open('data_example.csv','rb')}
r = requests.post('http://localhost:8000/upload/api/',files=files)
print r.text