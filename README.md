# csv_to_db

By Arnaud Joly - 12/04/2018

Parse the two .csv file on the server, and upload them into a local mongodb Database, in a table named "apple_location".

There is 6 existing routes, 3 per files, with similar use:

  /api/data /         -> display all the locationData in the database
            /parse    -> parse the .csv file and insert into the database
            /empty    -> empty the associated collection
            
  /api/map            -> same routes and functionalities
  
  
 
