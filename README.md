# 1800-clothing-node
Node application with API for 1800 clothing

## API Guide
This is a mimic of how the API endpoints are set up for the PHP site. All requests are GET requests.

### /costumes
Returns all costumes

### /search
Returns costumes from one decade. Specify which decade by adding a / after search, and the decade you want.
Example: 
```
/api/search/1850
```

### /yearssearch
Requires a ```year_from``` and a year_to parameter. 
Decades are separated by a /. for example:
If you wanted to search for costumes from 1850 to 1860, you need to format your URL like the following:
```
/api/yearssearch/1850/1860
```
