import React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import './Other.css';


class Explanation extends React.Component {
  render () {
    return(
      <div>
        <div className="ms-font-l row center-xs">
          <div className="col-xs-12 col-md-10">
            <p>
              After you pick a verse, and click 
              <span className="ms-fontColor-themePrimary"><em> Find Similar Verses</em></span>,
              15 similar verses are pulled down and you can see the verse in context or view the chapter in BibleHub.
            </p>
            <p>
              Currently, this is only for the New Testament (ESV).
              The idea behind this comes from the fact that ideas and points in the Bible are repeated,
              making the New Testament an ideal candidate for using the
              &nbsp;<Link target="_blank" href='https://en.wikipedia.org/wiki/Cosine_similarity'>cosine similarity</Link>&nbsp;
              measure (along with Tfidf scores) to find similar verses.
              In combination with other online tools, this may be useful.
              Complex verses may be better understood by reading similar passages in different contexts.
            </p>
            <p>
              More than anything, this was a learning experience so it is what it is!
            </p>
            <div className="ui divider"></div>
            <p>
              <i className="ms-Icon ms-Icon--Code" aria-hidden="true"></i>NodeJS, Express, MongoDB, and React.
              &nbsp;<Link target="_blank" href='http://dev.office.com/fabric/components/link'>View Project on Github</Link>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default Explanation;
