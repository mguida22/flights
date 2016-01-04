#! /usr/bin/env python3

import csv
import json
import os
import sys

sums = {}
counts = {}

infile_path = sys.argv[1]
tmpfile_path = 'tmp.csv'

print('Reducing data. This may take a long time.')

tmpfile = open(tmpfile_path, 'w')
with open(infile_path, newline='') as infile:
    reader = csv.reader(infile, delimiter=',')
    for row in reader:
        tmpfile.write(row[0]+"-"+row[1]+"-"+row[2]+" "+row[15]+" "+row[16]+"\n")

tmpfile.close()

print("Finished.")
print('Averaging delay data by date for each airport.')

with open(tmpfile_path, newline='') as f:
    next(f)
    reader = csv.reader(f, delimiter=' ')
    for row in reader:
        if row[0] in sums:
            if row[2] in sums[row[0]]:
                try:
                    sums[row[0]][row[2]] += int(row[1])
                    counts[row[0]][row[2]] += 1
                except:
                    pass
            else:
                try:
                    sums[row[0]][row[2]] = int(row[1])
                    counts[row[0]][row[2]] = 1
                except:
                    pass
        else:
            try:
                sums[row[0]] = {}
                sums[row[0]][row[2]] = int(row[1])
                counts[row[0]] = {}
                counts[row[0]][row[2]] = 1
            except:
                pass

for date in sums:
    for airport in sums[date]:
        sums[date][airport] = sums[date][airport] / counts[date][airport]
        # only have delays, do not count when ahead of schedule
        if (sums[date][airport] < 0):
            sums[date][airport] = 0

with open('delays.json', 'w') as f:
    # Pretty printed
    # print(json.dumps(sums, indent=4), file=f)
    print(json.dumps(sums), file=f)

print('Finished. Data saved to delays.json')
print('Cleaning up.')

os.remove(tmpfile_path)

print('Finished.')
