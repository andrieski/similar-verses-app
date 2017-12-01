## Description

This project is ultimately a web app that aims to help users find similar bible
verses using cosine similarity. In combination with other online tools, this may
be useful. Complex verses may be better understood by reading similar passages
in different contexts.

The app lets the user pick a verse and search for similar verses, letting the
user also view the similar verses in context. View the app in action at
https://andrieski.github.io/similar-verses-app/. Bootstrapped with
[Create React App](https://github.com/facebookincubator/create-react-app).

## App Gif:

<img align="center" alt="example" src="https://github.com/andrieski/similar-verses-app/blob/master/example.gif" />

## Details

The data prep and server files aren't published, but basically, it's just a node
script that generates a list of documents (Bible verses) and adds the top X
related verses (according to cosine similarity score) to each one so they don't
have to be recalculated in the web app. The pre-processing included using lemmas
and tf-idf scores. The data is stored in a MongoDb collection.
