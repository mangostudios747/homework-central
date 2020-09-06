import pandas as pd
import json
import ast
import re
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
courseNames = []
for i in hf:
    # convert everything to dictionary since we parsed to string earlier
    hf[i]['id'] = ast.literal_eval(hf[i]['id'])
    hf[i]['room'] = (ast.literal_eval(hf[i]['room'])[0])
    if hf[i]['room']=='nan':
        hf[i]['room'] = None
    hf[i]['courseName'] = ast.literal_eval(hf[i]['courseName'])[0]
    courseNames.append(hf[i]['courseName'])
    hf[i]['teacherDisplay'] = ast.literal_eval(hf[i]['teacherDisplay'])
    if hf[i]['teacherDisplay']==['nan']:
        hf[i]['teacherDisplay']= []
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
    hf[i]['categories'] = [[], [], []] # make room.
    # now we need to use regex to find out what category the course is in
    try:
        desc = hf[i]['course']['description']
    except KeyError:
        desc = ''
    ## length
    lengthraw = re.search(r'(L|>)ength:?(</strong>)*:?\ ?(.*?)(<p>|<br>|</p>|</li>|&nbsp|</strong>)',desc)
    if lengthraw != None:
        hf[i]['categories'][2].append(lengthraw.group(3))
        if "Semester " in lengthraw.group(3):
            hf[i]['categories'][2].append('Semester')

    else:
        hf[i]['categories'][2].append('Year')

    ## Benefits
    
    isAP = re.search(r'^AP.*', hf[i]['courseName']) or re.search(r'.*AP$', hf[i]['courseName'])
    if isAP:
        hf[i]['categories'][1].append("AP")
    isSJ = re.search(r'SJ$', hf[i]['courseName']) or re.search(r'SJ$', i)
    if isSJ:
        hf[i]['categories'][1].append("SJ")
    isHonors = re.search(r'.*H$', hf[i]['courseName'])
    if isHonors:
        hf[i]['categories'][1].append("Honors")
    isSLC = re.search(r'SLC', hf[i]['courseName'])
    if isSLC:
        hf[i]['categories'][1].append("SLC")
    isAdv = re.search(r'(A$|Advanced|Adv)', hf[i]['courseName']) #or re.search(r'advanced(?!\ placement)', desc)
    if isAdv:
        hf[i]['categories'][1].append("Advanced")
    ##  Subjects
    isMath = re.search(r'(Calc|Analysis|Trig|Alg|Geom|Math|Statistics)', hf[i]['courseName'])
    if isMath:
        hf[i]['categories'][0].append("Math")
    isMusic = re.search(r'Orchstr|Band|Music|Jazz|Choir|Voc', hf[i]['courseName'])
    if isMusic:
        hf[i]['categories'][0].append("Music")
        hf[i]['categories'][1].append('VPA')
    isArt = re.search(r'Art|Ceramics|Photo|Design|Painting', hf[i]['courseName'])
    if isArt:
        hf[i]['categories'][0].append("Art")
        hf[i]['categories'][1].append("VPA")
    isHist = re.search(r'hist|Hist|US|ContWld|Geography', hf[i]['courseName'])
    if isHist:
        hf[i]['categories'][0].append("History")
    isEnglish = re.search(r'(?<!Spanish\ )Lit|Am\ Clas|Inter\ Comp|Cont\ Herit', hf[i]['courseName'])
    if isEnglish:
        hf[i]['categories'][0].append("English")
    isPE = re.search(r'(^PE|Yoga)', hf[i]['courseName'])
    if isPE:
        hf[i]['categories'][0].append("PE")
    if re.search(r'Theatre',hf[i]['courseName']):
        hf[i]['categories'][0].append('Theatre')
        hf[i]['categories'][1].append('VPA')
    ## CTE?
    isCS = re.search(r'CS|Prog|Comp.', hf[i]['courseName'])
    if isCS:
        hf[i]['categories'][0].append("CS")
    isCTE = re.search(r'(Tech|Video|Digi|Auto|PLTW|Law|Sports)', hf[i]['courseName']) or isCS
    if isCTE:
        hf[i]['categories'][1].append("CTE")

    ## Prep?
    isPrep = re.search(r'Prep', hf[i]['courseName'])
    if isPrep:
        hf[i]['categories'][0].append("Prep")
    ## Sciences
    isChem = re.search(r'Chem', hf[i]['courseName'])
    if isChem:
        hf[i]['categories'][0].append("Chemistry")
    isPhysics = re.search(r'Physics|physics', hf[i]['courseName'])
    if isPhysics:
        hf[i]['categories'][0].append("Physics")

    isBio = re.search(r'Bio|bio', hf[i]['courseName'])
    if isBio:
        hf[i]['categories'][0].append("Biology")

    isScience = re.search(r'Science', hf[i]['courseName']) or isChem or isPhysics or isBio
    if isScience:
        hf[i]['categories'][0].append("Science")
    ## World Languages
    isJapanese = re.search(r'Japn|Japanes', hf[i]['courseName'])
    if isJapanese:
        hf[i]['categories'][0].append("Japanese")
        hf[i]['categories'][0].append("World Language")
    isGerman = re.search(r'(German)', hf[i]['courseName'])
    if isGerman:
        hf[i]['categories'][0].append("German")
        hf[i]['categories'][0].append("World Language")
    isSpanish = re.search(r'(Spanish|Span|SpCiv)', hf[i]['courseName'])
    if isSpanish:
        hf[i]['categories'][0].append("Spanish")
        hf[i]['categories'][0].append("World Language")
    isFrench = re.search(r'(French)', hf[i]['courseName'])
    if isFrench:
        hf[i]['categories'][0].append("French")
        hf[i]['categories'][0].append("World Language")
    isChinese = re.search(r'(Chinese|^ChL)', hf[i]['courseName'])
    if isChinese:
        hf[i]['categories'][0].append("Chinese")
        hf[i]['categories'][0].append("World Language")

with open('courses.json', 'w') as f:
    f.write(json.dumps(hf, indent=4))
#print(courseNames)
