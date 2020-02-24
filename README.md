# Real-Time Traffic Solutions for Natural Disasters

By Patrick Mais, Renee Wilkening, and John Ellegard 
February 20, 2020


## Problem Statement:

This project leverages Twitter and here.com to identify real-time road safety where roads are open or safe on traffic apps but in real life are closed, damaged, obstructed, in the path of a fire, or covered with thick, choking smoke.The project outlines and demonstrates a web tool that would allow the user, the public or emergency personnel to identify actual road obstructions and traffic incidents, as well as peripheral dangers like smoke levels, to inform their travel routes. 


## Overview: 

During disasters, traffic apps don’t always tell the whole story about road conditions. Roads can be “open” but blocked by debris or enveloped in thick choking smoke. With the mayhem of mass evacuations and with emergency personnel pouring in, going down a closed, blocked, or dangerous road may lead to mass destruction of infrastructure, cause severe injury, or can spell death for those involved. 

We were requested by New Light Technologies, in partnership with General Assembly, to explore the issue and provide possible insights and solutions. New Light Technologies is a small agile organization that provides innovative technology, data, and strategic solutions. They work on disaster response problems for organizations such as FEMA (the Federal Emergency Management Agency), USAID (the United States Agency for International Development), the U.S. Census Bureau, and The World Bank. General Assembly is a tech Bootcamp empowering and equipping aspiring techies to become powerful players in technology. 

We started the project by investigating traffic trends in the Los Angeles area during the fires in October and November of 2019. We gathered Twitter data on Saddleridge, Tick and Getty Fires. The damage estimates from these fires that ripped across Southern California ran as high as $14.8billion, according to the disaster modeler Chuck Watson. The costs are bound to keep rising for future fires. 

We used historical Twitter data to capture information unique to natural disasters. Since Here.com’s API reports all traffic incidents, we didn’t think historical data added extra value and instead explored the power of having access to real-time data. We show sample maps plotting current Here.com data and historical Twitter data to get a full picture of what a user-friendly map would look like. 

One of the first hurdles we discovered for users is not knowing what to query when searching Twitter. Often, especially in times of crisis, one types something general like, “fire info, near me”, but without the right hashtags, the query yields scattered results. Maybe the search results have info about the fire, maybe it’s not up to date, or maybe the disaster is so new there’s no activity to show at the top of searches. To tackle this issue we created a query suggester. The suggester takes in a query, pulls in tweets based on said query, cleans the data, then runs the hashtags through Countvectorizer, pulling out the top 50 most common hashtags. From there, the suggester would use Word2Vec’s “most similar” tool to find the most similar hashtags. Those suggested tweets would then be available to requery with. 

To model road closures via Twitter we scraped tweets, cleaned and processed the data and used a custom classifier to label if a road is actually closed versus an irrelevant tweet. From there we modeled with Logistic Regression, Decision Trees and Random Forests with TFIDF providing the best results. 
To model real-time-traffic incidents we used the Here.com API. Using their API we were able to retrieve the longitude and latitude of current traffic incidents. According to their website, Here’s location information is so precise that it’s road and lane info are correct up to 10 - 20 cms, can identify new potholes and can identify fast and slow-moving lanes. 

### Methodology:

The following is how we achieved our goal of collecting, modeling, and mapping road closures from social media.

### Data Collection:

With Twitter's Search API you can only send 180 Requests every 15 minutes. With a maximum number of 100 tweets per Request, this means you can mine for 4 x 180 x 100 = 72,000 tweets per hour. By using TwitterScraper you are not limited by this number but by your internet speed/bandwidth and the number of instances of TwitterScraper you are willing to start., Another disadvantage of the Search API is that you can only access Tweets written in the past 7 days. This is a major bottleneck for anyone looking for older past data to make a model from. With TwitterScraper there is no such limitation. We scraped hashtags related to the fires along with notable traffic accounts to gather proper training data. We collated 9075 unique tweets from October 10, 2019, to November 6, 2019.

### Cleaning:

Data came to us from TwitterScraper with 22 different columns: Tweet-id, Tweet-Url, Tweet text, Tweet Html, Links inside Tweet, Hashtags inside Tweet, Image Urls inside Tweet, Video URL inside Tweet, Tweet timestamp, Tweet Epoch timestamp, Tweet No. of likes, Tweet No. of replies, Tweet No. of retweets, Username, User Full Name / Screen Name, User ID, Tweet is a reply to, Tweet is replied to, List of users Tweet is a reply to, and Tweet ID of parent tweet. We identified the tweet text, username, and the hashtag (query). We then searched for important data points, as well as the hashtags used in the tweet (this came in handy for the query suggester). Wildfires are quickly named by safety authorities to quickly and effectively communicate information to the public. These named hashtags are critical to getting good information during a crisis and helpful when modeling road closures. After dropping unnecessary columns, we then checked for nulls and dropped unnecessary rows. We made the text data all lower case and removed stop words. Finally, we passed 9075 tweets through the CountVectorizer and TFIDF. The CountVectorizer/TFIDF provides a simple way to both tokenize a collection of text documents and build a vocabulary of known words, but also to encode new documents using that vocabulary. 

### Query Suggester:

To build the query suggester we isolated the hashtags column provided when scraping data from twitter. In each row, there was a list of hashtags used in the tweet. From there we ran it through CountVectorizer and sorted for the top 50 most common hashtags. Those top 50 hashtags were then converted into a list of lists formatted to load as the corpus for `Gensim.Models.Word2Vec`. Once the corpus was loaded we ran a for loop that used `model.most_similar()` for the top 50 most common hashtags. The most similar words were appended to a list and made into a set to get only the unique hashtags to query on. In a real-life model, that list would either be used to manually requery or used to iteratively requery until the desired query is achieved. 



### Pre-Processing Tweets For Modeling:

We used a 3-fold keyword classification function to classify Tweets as 1 for road closed if any of the selected keywords were found in the text, and 0 if the tweet did not meet the classification criteria. We ended up with an unbalanced class, labeling 8762 as tweets that did not include road closure data and 313 as road closed.

### EDA:

 Our most impactful tweets came from a small number of accounts. Two organizations Go511 and Caltrans and several individual user accounts
![img](https://lh6.googleusercontent.com/Ba-MUEsWGCS4b5amVOQ5xFNevyUZFITM0pWwD_Olu2DAfAnO2FXhIfzbrGk17rpJYbk41dh_6YiR1XUWiA2vSJzEjp93vhhXtA7j4PDRYFntIZ2ib2vVDzOMi_BYRZI9TROIUgC8)

### Modeling:

We viewed this project as a classification problem. If we could identify routes that were closed, we could redirect traffic away from impacted areas thus creating the ability to save lives in the event of a natural disaster. After our data was pre-processed, it was ready for modeling. In our first model, we built a pipeline that included a CountVectorizer transformer and a Logistic Regression estimator. We then grid searched over several parameters and fit the model. The next model we chose to run was a TFIDF transformer and Logistic Regression estimator. Again, we grid searched over several parameters and fit the model. From there we used models with both Decision Trees and Random Forest but Logistic Regression still upheld the best results. 

### Modeling Results:

CountVectorizer/Logistic Regression model was extremely overfitting, scoring 99.9% on the training data and 98.3% on our testing data. TFIDF/Logistic Regression model again extremely overfit with a training score of 100% and a testing score of 98.5%. That being said, accuracy was not the primary metric we wanted to evaluate. We were more concerned with Type I and Type II errors. 

**Type I Error** (or False Positive) is a result that indicates that a given condition is present when it actually is not present. In our model, Type I errors would be incorrectly predicting the road was closed, when it is actually open. In our example, this would cause fewer cars/traffic/people using a safe escape route. A low Type I error would mean fewer routes were incorrectly flagged as the road being closed, therefore not allowing for the maximum number of escape routes. 

**Type II Error** (or False Negative) is a result that indicates that a given condition is not present when it actually is present. In our model, Type II errors would be incorrectly predicting the road was open, when it is actually closed. With this model, we would want to minimize Type II errors, as it could potentially be catastrophic to send an evacuee into a dangerous situation. Unfortunately, our data and modeling indicated a relatively high level of false negatives with a sensitivity score of 75%. 

![img](https://lh3.googleusercontent.com/cbUXJTFRoHSwc3LsAyGfZicjcvNf8CrYRC2QYrEnwmROPCb1tVT2aoEcHwAzYSkT7VTy1zVFZ5O5vrB_Y4gHHBTbprXl8XI3EjcAacrKUv9RA4DWtMKEs5KNNhqrsVfEHcZi2qLj)

## Limitations And Recommendations:

### Query Suggester:

Though we were able to get the model working, the suggestions generated would need further cleaning or to be manually selected before implementation. Also, the model was trained on semi-informed tweets and should be tested on live data to  check preformance. (Fortunetly there weren't current fires to test on at the time we created the suggester).

### Twitter:

Through delving into the project we realized that Twitter's main benefit is peripheral disaster information and not mapping specific road closure locations. We say this in part because tools like here.com and traffic apps seem to have better geoinformation when it comes to pinpointing the specific location of an incident. Additionally, because Twitter geotagging information is opt-in it is hard to get enough reliable location data for a meaningful analysis. However, Twitter does seem to be an important tool that would provide insight into road and driving dangers that do not include road blockages. These would be things such as roads covered in choking thick smoke from a fire, being in the path of a tornado or flood, or roads or sections of street that are covered in black ice. An informative Tweet could flag a dangerous area as a “do not recommend” or “drive with care” to prevent incidents that would have otherwise occurred if one simply looked at the traffic map as “open”.

### Here.com:

Though Here.com is a powerful site, the learning curve is steep. For future projects, we recommend setting aside enough time to delve into the tool to get meaningful results. 

## Example of Real-Time-Traffic Webtool:

This map is an example of what a map would look like in times of disaster. The red shaded areas represent past LA fires (or whichever natural disaster is relevant), the orange and black pins are the locations we were able to infer from road name mentions in tweets during said fires, and the blue pins are current traffic incidents from Here.com. The black shaded area around the fires represents the “not recommended to drive” area. These would be the areas determined by fire specialists where roads are open but unsafe - information that is not currently available through current traffic apps (google maps will have a fire icon of where the burning area is but will not indicate roads that are still unsafe). 

Though there are roads open in the shaded area, this map would let users know it’s at their own risk and would recommend drivers find alternative routes or stay away. 
![img](https://lh3.googleusercontent.com/nE6qWYiN0y-vK6hzTpaTNgBsQ3WSuMrTw4QwUv3JWm46sB_cZOrPrqpMLkbcYluvj-zBNeOPDBIM73ly9xv7NpKXrPYLsJNkbGFaqHOyzdZPvwwiqr8ovBqClyp6FpEE6hHusupx)