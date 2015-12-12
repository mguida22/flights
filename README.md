# Flights

A visual representation of U.S. domestic flight delays across the year 2008. The scripts should allow you to easily swap out the data for a different year.

![screenshot of delays](https://cloud.githubusercontent.com/assets/9451227/11758676/59f040fe-a02b-11e5-976c-8eb4f355bc23.png)

## Setup

Grab the data from [stat-computing.org](http://stat-computing.org/dataexpo/2009/the-data.html). Once you have the data run `reduce.py` and then `delays.py` to calculate and condense the data. You will need a file server running to see the site. An example may look like this.

```
# Data saved to data/2008.csv
$ cd data/
$ python3 reduce.py
$ python3 delays.py
$ cd ..
$ python3 -m http.server
```
 Once your data is processed, you will only need a simple file server for future uses.

### License
MIT

Flight data originally from U.S. Department of Transportation and retrieved from [stat-computing.org](http://stat-computing.org/dataexpo/2009/the-data.html)
