##Schema Notes
###Profiles
string: name, (not null)  
string: profile_token, (unique)  
integer: account_id, (indexed, not null)  
string: avatar_url, (not null)  
timestamps  

###Ads
string: company, (indexed, not null)  
string: product, (indexed, not null)  
string: description, (not null)  
string: year, (not null)  
string: thumb_url, (default, not null)  
string: youtube_link, (not null)  

###AdGenres
integer: ad_id, (indexed, not null)  
integer: genre_id, (indexed, not null)  

###Genres
string: name, (indexed, not null)  

###Account
string: email, (indexed, unique, not null)  
string: password_digest, (not null)  
string: session_token, (indexed, unique, not null)
boolean: admin, (default false, not null)   

###Views
integer: ad_id, (indexed, not null)  
integer: profile_id, (indexed, not null)  
integer: rating, (indexed, only[0-5], not null)  
