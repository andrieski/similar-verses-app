This project is ultimately a web app that aims to help users find similar bible verses using cosine similarity. In combination with other online tools, this may be useful. Complex verses may be better understood by reading similar passages in different contexts.

This is part of a 3-repo project. I guess I could've merged them, maybe sometime.

| Repo | Description |
| ------ | ------ |
|[Data Prep](https://github.com/andrieski/similar-verses-data-prep)|Node script that creates a list of documents (Bible verses) and adds the top X related verses to each one so they don't have to be recalculated in the web app. Goes beyond a simple implementation of cosine similarity by using lemmas and tfidf scores for better results. Entry is `setup-data.js`, which produces `documents.json`.|
|[Server](https://github.com/andrieski/similar-verses-server)|Has various endpoints (related to similar Bible verses) that call a mongo db to return results from the repo above.|
|[App](https://github.com/andrieski/similar-verses-app)|The app lets the user pick a verse and search for similar verses, letting the user also view the similar verses in context. View the app in action at https://andrieski.github.io/similar-verses-app/. Bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).|


App Gif:
<img align="center" alt="example" src="https://github.com/andrieski/similar-verses-app/blob/master/example.gif" />
