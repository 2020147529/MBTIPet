import requests
import json
from bs4 import BeautifulSoup


api_key=524349666275736534344965474272
url=f"http://openapi.seoul.go.kr:8088/{api_key}/json/TbAdpWaitAnimalView/1/1/"

api_response=requests.get(url)

if api_response.status_code!=200:
    print("Error")
else:
    data=json.loads(api_response.content)
    #dict_keys(['ANIMAL_NO', 'NM', 'ENTRNC_DATE', 'SPCS', 'BREEDS', 'SEXDSTN', 'AGE', 'BDWGH', 'ADP_STTUS', 'TMPR_PRTC_STTUS', 'INTRCN_MVP_URL', 'INTRCN_CN', 'TMPR_PRTC_CN'])
    # for i in data["TbAdpWaitAnimalView"]["row"]:
    #     for k in i.keys():
    #         # print(k,i[k])
    #         pass
    
    soup=BeautifulSoup(data["TbAdpWaitAnimalView"]["row"][0]["INTRCN_CN"],'html.parser') #설명 

    print(soup.text)
    # with open('./output.html', 'w') as file:
    #     file.write(soup.prettify())




