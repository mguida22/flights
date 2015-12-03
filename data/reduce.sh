#! /bin/bash

echo "Reducing data. This may take a long time."

INFILE=2008.csv
OUTFILE=2008-flights.csv

touch $OUTFILE

# Grab important columns and combine YYYY-MM-DD into the proper format
awk -v outfile="$OUTFILE" -F "\"*,\"*" '{
  printf "%d%s%02d%s%02d %04d %d %s \n", $1, "-", $2, "-", $3, $5, $16, $17, $18 > outfile
}' $INFILE

printf '%s\n\n' "$(tail -n +2 $OUTFILE)" > $OUTFILE

echo "Finished."
