#! /usr/bin/env python

import csv
import json

sums = {}
counts = {}

print('Averaging delay data by date for each airport.')

with open('2008-flights.csv', newline='') as f:
    reader = csv.reader(f, delimiter=' ')
    for row in reader:
        if row[0] in sums:
            if row[2] in sums[row[0]]:
                counts[row[0]][row[2]] += 1
                sums[row[0]][row[2]] += int(row[1])
            else:
                counts[row[0]][row[2]] = 1
                sums[row[0]][row[2]] = int(row[1])
        else:
            counts[row[0]] = {}
            counts[row[0]][row[2]] = 1
            sums[row[0]] = {}
            sums[row[0]][row[2]] = int(row[1])

for date in sums:
    for airport in sums[date]:
        sums[date][airport] = sums[date][airport] / counts[date][airport]

with open('delays.json', 'w') as f:
    # Pretty printed
    # print(json.dumps(sums, indent=4), file=f)
    print(json.dumps(sums), file=f)

print('Finished. Data saved to delays.json')
