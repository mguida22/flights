# download data
if [ -f "us.json" ]; then
	echo "already have us.json"
else
  wget https://raw.githubusercontent.com/mguida22/flights/gh-pages/data/us.json
	echo "downloaded us.json"
fi

if [ -f "airport-codes.csv" ]; then
	echo "already have airport-codes.csv"
else
  wget https://raw.githubusercontent.com/mguida22/flights/gh-pages/data/airport-codes.csv
	echo "downloaded airport-codes.csv"
fi

if [ -f "2008.csv" ]; then
	echo "already have 2008.csv"
elif [ -f "2008.csv.bz2"]; then
  echo "already have 2008.csv.bz2"
  echo "unzipping 2008.csv.bz2"
  bunzip2 2008.csv.bz2 -v
else
  wget http://stat-computing.org/dataexpo/2009/2008.csv.bz2
	echo "downloaded 2008.csv.bz2"
  echo "unzipping 2008.csv.bz2"
  bunzip2 2008.csv.bz2 -v
fi

if [ -f "delays.json" ]; then
  echo "already have delays.json"
else
  python3 delays.py 2008.csv
fi

echo "Successful."
