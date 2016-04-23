import json

NAME = 1
REQUESTS = -10
REJECTED = -5
NO_RESPONSE = -4
COMPLETED = -3
PARTIALLY_COMPLETED = -2

descriptives = {}
descriptives["FBI"] = { "keywords": ["Federal Bureau of Investigation"] }
descriptives["Police"] = { "keywords": ["Police", "Sheriff"] }
descriptives["Immigration"] = { "keywords": ["Immigration", "Customs"] }
descriptives["Justice"] = { "keywords": ["Justice"] }
descriptives["Transit"] = { "keywords": ["Transportation", "Transit"] }
descriptives["Environment"] = { "keywords": ["Environment"] }

for key in descriptives:
	descriptives[key]["Agencies"] = 0
	descriptives[key]["Requests"] = 0
	descriptives[key]["Rejected"] = 0
	descriptives[key]["Ignored"] = 0
	descriptives[key]["Completed"] = 0

with open('agency.csv', 'r') as file:
	lines = file.read().split('\r')[1:]
	for line in lines:
		values = line.split(',')
		for key in descriptives:
			match = False
			for keyword in descriptives[key]["keywords"]:
				if keyword in values[NAME]:
					match = True
			if match:
				descriptives[key]["Agencies"] += 1
				descriptives[key]["Requests"] += int(values[REQUESTS])
				descriptives[key]["Rejected"] += int(values[REJECTED])
				descriptives[key]["Ignored"] += int(values[NO_RESPONSE])
				descriptives[key]["Completed"] += int(values[COMPLETED])

print("var descriptives = " + json.dumps(descriptives) + ";")