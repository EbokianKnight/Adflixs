#AdFlixs
##Minimally Viable Product
This website will allow a user to create an account, profiles and within each profile view lists of advertisements which they can view and rate. These add lists will be sorted by genre and have a default priority. This priority will change as users view and rate adds. Users will be able to save and remove adds to their favorites list. Users will be able to leave reviews on ads and ads will show the average user rating. 

##User Authentication and Project Setup (few hours)
* Setup Rails / React / Flux
* Table Migration: Accounts (session_token, password_digest, email)
* Rails MVC:  Accounts / Sessions

will be able to login/logout and sign in/sign up.  
will be able to find project folders and display a react component ready message.  
will have bundled desired gems and npm files for workflow.  
will have setup webpack.  

##Profile Implementation (1 day)
* Table Migration: Profiles (name, profile_token, account_id, avatar_url)
* Associations: Profiles / Accounts
* Rails MVC: Profiles
* Components: Main / ProfileIndex / ProfileEdit / ProfileAdd
* Flux: ProfileStore
* Route: establish navigation
* Basic CSS/HTML implementation

**bonus:** employ profile limiter.  
**bonus:** instantiate simultaneous logins and session limiters.  

will root to main page.  
will have session / account display.  
will be able to create/add/edit new profiles.  
will be able to navigate to components using single page url.  
will have very basic layout of corresponding Netflix pages mimicked.  

##Advertisement Implementation (2 days)
* Table Migration: Ads (company, product, description, year),
* Table Migration: AdGenres (ad_id, genre_id), 
* Table Migration: Genres (name), 
* Associations: Ads, AdGenres, Genres
* Rails MVC: Ads, AdGenres, Genres
* Components: AdsIndex, AdRow, AdThumb, AdDetailPane
* Flux: AdStore
* Basic CSS/HTML implementation
* Seed: simple-videos

will have a movie page header.  
will have a movie page navbar.  
will be able to see video thumbs.  
will be able to expand/close video details.  
will be able to see genres assigned to videos.  
will be able to see videos transition rollovers.  
will be able to carousel through videos. 

##Account Details (0.5 day)
* Components: AccountDetail, MembershipBilling, ChangePassword, ChangeEmail, CancelMembership
* Rails MVC: Account(:destroy, :update)
* Route: establish navigation
* Basic CSS/HTML implementation

will be able to view account details.  
will be able to switch between accounts from the nav-bar.  
will be able to change email addresses.  
will be able to change passwords.  
will be able to cancel memberships.  

##Movie Submission(few hours)
* Components: AddMovie
* Route: establish navigation
* Basic CSS/HTML implementation

will be able to create a new ads for the database

##EndOfWeekPolish
* Spend Time getting pixel perfect data representation
* Switch from Html Login requests to React Login requests
* place an appropriate static image for the MainHeader.
* Table Migration: Account (authority) [normal, admin]
* Validation: movie submission and account blocking for admin

will have a functional website with similar appearance.  
will have a list of bugs to correct.  
will be able to navigate through the website.  
will be able to view different pages on login.  

##Advertisements to Profile (1 day)
* Table Migration: Views (account_id, ad_id)
* Table Migration: Rates (account_id, ad_id)
* Association: Views, AccountViews, Rates, AccountRates, Accounts
* Rails MVC: create/update
* Flux: RateStore, ViewStore (might combine these.. probably will)
* Components: RatingStars
* Basic CSS/HTML

will be able to rate movies.    
will list genres rows by most liked.   
will list products rows by most liked.   
will have ads reflect average rating.   
will remember rating.   
will be able to change an ads rating.   
will yield priority to unwatched ads.   
will have row category of recently watched ads.   
will have row category of highest rated ads.

##Add Image Hosting (0.5 days)
* add image requirements to ad postings
* add image thumbs
* add carousel imaging to AdDetail
* add profile image to profiles

##Add Featured Ads (0.5 days)
* Admin can select up to 5 feature ads
* Admin must supply 3 to 5 high-res images
* Featured Ads will display and carousel within the Main Header   

##Advertisements to Account (1 day)
* Rails MVC: View, Rate, Ad (:destroy)
* Components: MyProfile, MyWatched, MyRated, AdminMovieList

will be able to view list of ads watched.   
will be able to individually delete watched history.   
will be able to view list of rated ads.   
will be able to individually delete rated history.  
will be able to view all ads as admin
will be able to remove any ad as admin
will enforce re-confirmation before ad removal

##Search Bar (0.5 days)
* Components: NavBarSearch, NavBarActive, SearchResultIndex, SearchResult, PotentialSearchIndex.
* Basic CSS/HTML

will be able to open and close nav search bar.  
will be able to dynamically see potential matches.  
will search through product, ad-titles

##Art Implementation (polish)
* Fix any CSS/HTML discrepancies
* Add custom logo / art buttons
* Add more then one profile avatar

#EXTRAS
<hr>

##Embedded Youtube and Playback
* implement youtube api
* re-seed with actual movies
* add actual image thumbs

##Provide Data Analytics for Admin
* consider useful correlations between ratings, views, and profiles for admin
* provide rendered art to dynamically display table graphs

##Add Email Confirmation for new users
* With an On/Off switch cause otherwise ugh, testing.

##Add Monthly Subscription
* with fake payment token and auto disabling accounts
* display subscription status within account details

##Add Fake Package Options
* display package options on root page
* display package description links
* display package options under signup
* display package options user account
* enable package upgrade and downgrade
* differentiate subscription token levels

##Create Table View of Rows / Genres
* click on a genre to view tabled layout of results

##Allow Drag/n/Drop Management of "MyList"
* under Account Detail, Profile Details add link
* dynamic table sorting 










