import json
import requests
from bs4 import BeautifulSoup
import time

finalJSON = {}

with open("rno.txt", "r") as f:
    rawdata = f.read()


rno = rawdata.split(",")  # all route numbers

print(rno)

exit()

contentList = []
print("Scraping Links :")

i = 0
for _ in rno:
    URL = "https://rectransport.com/nrouteBox/n"+_.lower()+".php"
    page = requests.get(URL).content
    contentList.append(page)
    i += 1
    print("link "+str(i))
print("\nTotal links scraped : "+str(len(contentList)))

'''
URL = "https://rectransport.com/nrouteBox/n01.php"
page = requests.get(URL).content
contentList.append(page)
'''

print("\nStarting Parse Section")

for i, _ in enumerate(contentList):
    soup = BeautifulSoup(_, 'html.parser')
    rowList = soup.findAll("tr")
    rowObject = []
    for ind, row in enumerate(rowList):
        subSoup = BeautifulSoup(str(row), 'html.parser')
        c = subSoup.findAll("td")
        cols = [_.text for _ in c]
        # print(cols)
        if(ind == 0):
            if(len(cols) == 1):
                rowObject.append(
                    {
                        'msg': cols[0],
                        'spl': 'yes',
                        'heading': 'yes'
                    }
                )
            else:
                rowObject.append(
                    {
                        'location': cols[0],
                        'time': cols[1],
                        'spl': 'no',
                        'heading': 'yes'
                    }
                )
        elif(len(cols) == 1):
            rowObject.append(
                {
                    'msg': cols[0],
                    'spl': 'yes',
                    'heading': 'no'
                }
            )
        else:
            rowObject.append(
                {
                    'location': cols[0],
                    'time': cols[1],
                    'spl': 'no',
                    'heading': 'no'
                }
            )

    finalJSON[str(rno[i])] = rowObject
    print(str(rno[i]))

with open("data.json", 'w') as f:
    f.write(json.dumps(finalJSON, indent=4))
    print("\nSUCCESS\n")
