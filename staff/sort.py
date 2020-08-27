import re
import json

categories = {'Video Prod': [[], []],
			  'AdvDigiFilm': [[], []],
			  'Adv Video H': [[], []],
			  'Audio/MusicProd': [[], []],
			  'Adv Audio/Music Prod': [[], []],
			  'Theatre 1': [[], []],
			  'Theatre 2': [[], []],
			  'Theatre 3': [[], []],
			  'Stage Tech': [[], []],
			  'Stg Tech11': [[], []],
			  'Theatre 4': [[], []],
			  'Philos Lit': [[], []],
			  'Cont Herit': [[], []],
			  'Contemporary Heritage': [[], []],
			  'Lit Style': [[], []],
			  'Literary Style': [[], []],
			  'AmerLit 11': [[], []],
			  'AmerLit': [[], []],
			  'AP English Lit & Comp': [[], []],
			  'Am Clas11H': [[], []],
			  'Am Clas11H SJ': [[], []],
			  'Inter Comp': [[], []],
			  'Film Lit': [[], []],
			  'Escape Lit': [[], []],
			  'Adv Journ': [[], []],
			  'Class Myth': [[], []],
			  'BroadJourn': [[], []],
			  'BasCollSk': [[], []],
			  'ReadBetLines': [[], []],
			  'Visual Story': [[], []],
			  'Wld Hist': [[], []],
			  'ContWld 11': [[], []],
			  'US Hist': [[], []],
			  'AP US History': [[], []],
			  'US Govt': [[], []],
			  'AP Human Geography': [[], []],
			  'USFor Pol H': [[], []],
			  'Econ AP': [[], []],
			  'Econ 11': [[], []],
			  'Psych 11': [[], []],
			  'Positive Psychology': [[], []],
			  'AP Psychology': [[], []],
			  'Focus on Success': [[], []],
			  'AP Statistics': [[], []],
			  'Alg 1A': [[], []],
			  'Geom': [[], []],
			  'Geom A': [[], []],
			  'Alg2/Trg A': [[], []],
			  'Pre Calc': [[], []],
			  'Alg2': [[], []],
			  'IntrAnl/Calc': [[], []],
			  'Analysis H': [[], []],
			  'Geom H': [[], []],
			  'Alg2/TrigH': [[], []],
			  'BEAM': [[], []],
			  'AP Calculus AB': [[], []],
			  'Applied Math': [[], []],
			  'AP Calculus BC': [[], []],
			  'APCompSci A': [[], []],
			  'PE 9': [[], []],
			  'PE 10': [[], []],
			  'Yoga': [[], []],
			  'Biology': [[], []],
			  'Biology H': [[], []],
			  'AP Biology': [[], []],
			  'Marine Biology': [[], []],
			  'Bio SLC': [[], []],
			  'Conceptual Physics': [[], []],
			  'AP Environmental Science': [[], []],
			  'AP Chemistry': [[], []],
			  'Chemistry': [[], []],
			  'Chemistry H': [[], []],
			  'Physics': [[], []],
			  'AP Physics 1': [[], []],
			  'AP Physics C: Mechanics': [[], []],
			  'AP Physics C: E&M': [[], []],
			  'AP Physics C': [[], []],
			  'Bio Tech': [[], []],
			  'Chinese 1': [[], []],
			  'Chinese 2': [[], []],
			  'ChLangCulAP': [[], []],
			  'Chinese 3': [[], []],
			  'ChineseCiv&CultureH': [[], []],
			  'French 1': [[], []],
			  'French 2': [[], []],
			  'French 3': [[], []],
			  'AP French Language': [[], []],
			  'German 1': [[], []],
			  'German 2': [[], []],
			  'German 3': [[], []],
			  'GermanLangAP': [[], []],
			  'Japanes 1': [[], []],
			  'Japanes 2': [[], []],
			  'Japanes 3': [[], []],
			  'Japanes 4H': [[], []],
			  'JapnLangAP': [[], []],
			  'Span/Span1': [[], []],
			  'Span/Span2': [[], []],
			  'Spanish 1': [[], []],
			  'Spanish 2': [[], []],
			  'Spanish 3': [[], []],
			  'SpCiv/CulH': [[], []],
			  'AP Spanish Language': [[], []],
			  'AP Spanish Literature': [[], []],
			  'Princ of Bus B': [[], []],
			  'CR/CivLaw': [[], []],
			  'Law 1': [[], []],
			  'Stage Tech 2': [[], []],
			  'Stage Tech 2D': [[], []],
			  'Adv Photo H': [[], []],
			  'Auto 1': [[], []],
			  'Auto 2': [[], []],
			  'Prnc Of Engr PLTW': [[], []],
			  'Prnc Of Engr H PLTW': [[], []],
			  'Fiber Arts': [[], []],
			  'Culinary Arts - Introduction': [[], []],
			  'Culinary Arts - International': [[], []],
			  'SportsNutr': [[], []],
			  'Interior11': [[], []],
			  'Photo 1': [[], []],
			  'Adv Photo': [[], []],
			  'Gprd/Yrbk': [[], []],
			  'Art Spec 1': [[], []],
			  'Ceramics 1': [[], []],
			  'GraphDes': [[], []],
			  'Adv Gr Des': [[], []],
			  'Advanced Ceramics 1': [[], []],
			  'Advanced Ceramics 2': [[], []],
			  'Adv.Draw/Painting H': [[], []],
			  'Pt/Dr 1': [[], []],
			  'Adv.Draw/Painting II': [[], []],
			  'Digital Art Spectrum': [[], []],
			  'Astrophysics': [[], []],
			  'AP Stud Art': [[], []],
			  'ArtStu3D AP': [[], []],
			  'Wind Ens': [[], []],
			  'AP Studio Art - Drawing': [[], []],
			  'Band': [[], []],
			  'Symph Band': [[], []],
			  'Jazz B': [[], []],
			  'Jazz Ens': [[], []],
			  'Orchstr': [[], []],
			  'Therapeutic Elective': [[], []],
			  'Academic Math': [[], []],
			  'Acad Enhancement SAI': [[], []],
			  'Conc Choir': [[], []],
			  'Adv Vocal': [[], []],
			  'Treb Choir': [[], []],
			  'AP Music Theory': [[], []],
			  'WritCr 11': [[], []],
			  'Beginning Journalism': [[], []],
			  'ERWC': [[], []],
			  'Academic Communications': [[], []],
			  'Funct Acad': [[], []],
			  'Voc Trng': [[], []],
			  'Acad Planning': [[], []],
			  'AVID': [[], []],
			  'SchServ 11': [[], []],
			  'Stu Govt': [[], []],
			  'Expl Exp12': [[], []],
			  'ExplExp-AAR': [[], []],
			  'Liv Skill': [[], []],
			  'Gen Weep11': [[], []],
			  'Int Engr Des PLTW': [[], []],
			  'Engn Tech': [[], []],
			  'Funct Object Or Prog': [[], []],
			  'AP Comp. Sci. Princ': [[], []],
			  'CS Capstone': [[], []],
			  'MLM GraphPub': [[], []],
			  'MLM GraphPubH': [[], []],
			  'Int Engr Des PLTW H': [[], []],
			  'Eng LL 1': [[], []],
			  'Eng LL 2': [[], []],
			  'EL 28': [[], []],
			  'ContWld LL': [[], []],
			  'USGovtLL': [[], []],
			  'WldHist LL': [[], []],
			  'World History-SLC': [[], []],
			  'Ind Study': [[], []],
			  'Contemporary Heritage SLC': [[], []],
			  'Literary Style SLC': [[], []],
			  'Counseling': [[], []],
			  'Prep': [[], []],
			  'Prep 11': [[], []],
			  'Prep 12': [[], []],
			  'SELF': [[], []]}
for course in categories.keys():
	## Benefits
	isAP = re.search(r'^AP.*', course) or re.search(r'.*AP$', course)
	if isAP:
		categories[course][1].append("AP")
	isSJ = re.search(r'SJ$', course)
	if isSJ:
		categories[course][1].append("SJ")
	isHonors = re.search(r'.*H$', course)
	if isHonors:
		categories[course][1].append("Honors")
	isSLC = re.search(r'SLC', course)
	if isSLC:
		categories[course][1].append("SLC")
	##  Subjects
	isMath = re.search(r'(Calc|Analysis|Trig|Alg|Geom|Math|Statistics)', course)
	if isMath:
		categories[course][0].append("Math")
	isMusic = re.search(r'Orchstr|Band|Music|Jazz|Choir|Voc', course)
	if isMusic:
		categories[course][0].append("Music")
	isArt = re.search(r'Art|Ceramics|Photo|Design|Theatre', course)
	if isArt:
		categories[course][0].append("Art")
	isHist = re.search(r'hist|Hist|US', course)
	if isHist:
		categories[course][0].append("History")
	isPE = re.search(r'(^PE|Yoga|Sports)', course)
	if isPE:
		categories[course][0].append("PE")
	## CTE?
	isCS = re.search(r'CS|Prog|Comp.', course)
	if isCS:
		categories[course][0].append("CS")
	isCTE = re.search(r'(Tech|Video|Digi|Auto|PLTW|Law)', course) or isCS
	if isCTE:
		categories[course][0].append("CTE")

	## Prep?
	isPrep = re.search(r'Prep',course)
	if isPrep:
		categories[course][0].append("Prep")
	## Sciences
	isChem = re.search(r'Chem', course)
	if isChem:

		categories[course][0].append("Chemistry")
	isPhysics = re.search(r'Physics|physics', course)
	if isPhysics:
		categories[course][0].append("Physics")

	isBio = re.search(r'Bio|bio', course)
	if isBio:
		categories[course][0].append("Biology")

	isScience = re.search(r'Science', course) or isChem or isPhysics or isBio
	if isScience:
		categories[course][0].append("Science")
	## World Languages
	isJapanese = re.search(r'Japn|Japanes', course)
	if isJapanese:
		categories[course][0].append("Japanese")
		categories[course][0].append("WorldLanguage")
	isGerman = re.search(r'(German)', course)
	if isGerman:
		categories[course][0].append("German")
		categories[course][0].append("WorldLanguage")
	isSpanish = re.search(r'(Spanish|Span)', course)
	if isSpanish:
		categories[course][0].append("Spanish")
		categories[course][0].append("WorldLanguage")
	isFrench = re.search(r'(French)', course)
	if isFrench:
		categories[course][0].append("French")
		categories[course][0].append("WorldLanguage")
	isChinese = re.search(r'(Chinese|^ChL)', course)
	if isChinese:
		categories[course][0].append("Chinese")
		categories[course][0].append("WorldLanguage")
# print(str(categories).replace(']],',']],\n\t'))

umarked = 0
for n in categories.keys():
	if categories[n][0] == []:
		print(n)
		umarked += 1
print(umarked)
with open('coursesCat.json', 'w') as f:
	f.write(json.dumps(categories, indent=4))
