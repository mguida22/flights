#! /usr/bin/env python

import csv

print('Reducing data. This may take a long time.')

outfile = open('2008-flights.csv', 'w')
with open('2008.csv', newline='') as infile:
    reader = csv.reader(infile, delimiter=',')
    for row in reader:
        outfile.write(row[0]+"-"+row[1]+"-"+row[2]+" "+row[15]+" "+row[16]+"\n")

outfile.close()

print("Finished.")
