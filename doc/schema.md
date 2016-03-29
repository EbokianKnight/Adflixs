##Schema Notes
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

###Users
string: email, (indexed, unique, not null)  
string: password_digest, (not null)  
string: session_token, (indexed, unique, not null)
boolean: admin, (default false, not null)  
string: avatar_url, (not null)  

###Views
integer: ad_id, (indexed, not null)  
integer: profile_id, (indexed, not null)  
integer: rating, (indexed, only[0-5], not null)

##images
string: imagable_type (not null)
integer: imagable_id (indexed, not null)
string: image_url (not null)
text: thumbs (JSON array, not null)

##features
integer: ad_id (indexed, not null)
text: images (JSON array, not null)
