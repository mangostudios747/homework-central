import pandas as pd
import numpy as np
import json
import ast
pd.set_option('display.max_rows', 500)
pd.set_option('display.max_columns', 9)
pd.set_option('display.width', 1000)
df = pd.read_json('classes.json').T.drop(
    ['calendarName', 'isMilkCount', 'courseAttendance', 'endYear', 'isActive', 'isAdultCount', 'isHomeroomSection',
     'isLunchCount'], axis=1)
ef = df.astype(str).groupby('courseNumber')
# print(ef.first()['course'])
gf = ef.agg(lambda x: list(set(list(x))))

hf = gf.astype(str).T.to_dict()  # combine, transpose, w/o
for i in hf:
    hf[i]['id'] = ast.literal_eval(hf[i]['id'])
    hf[i]['room'] = (ast.literal_eval(hf[i]['room'])[0])
    if hf[i]['room']=='nan':
        hf[i]['room'] = None
    hf[i]['courseName'] = ast.literal_eval(hf[i]['courseName'])[0]
    hf[i]['teacherDisplay'] = ast.literal_eval(hf[i]['teacherDisplay'])
    hf[i]['number'] = ast.literal_eval(hf[i]['number'])
    hf[i]['course'] =ast.literal_eval(ast.literal_eval(hf[i]['course'])[0])
    hf[i]['periods'] = ast.literal_eval(hf[i]['periods'])
    for j in range(len( hf[i]['periods'])):
        hf[i]['periods'][j] = ast.literal_eval(hf[i]['periods'][j])
    hf[i]['terms'] = ast.literal_eval(hf[i]['terms'])
    for j in range(len(hf[i]['terms'])):
        hf[i]['terms'][j] = ast.literal_eval(hf[i]['terms'][j])
    hf[i]['teachers'] = ast.literal_eval(hf[i]['teachers'])
    for j in range(len(hf[i]['teachers'])):
        hf[i]['teachers'][j] = ast.literal_eval(hf[i]['teachers'][j])

with open('courses.json', 'w') as f:
    f.write(json.dumps(hf, indent=4))
