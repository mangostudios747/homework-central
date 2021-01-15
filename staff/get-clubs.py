import os
stream = os.popen('node staff/get-cllubs.js')
output = stream.read()
print(output)
with open('clubs.json','w') as  jsonFile:
    jsonFile.write(output)
    jsonFile.close()

