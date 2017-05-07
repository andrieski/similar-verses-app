import React from 'react';
import './RelatedVerse.css'

class RelatedVerse extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      versesInContext : [],
      active: false
    };
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <table className="similar-verse-table">
            <tbody>
              <tr className="verse-row" onClick={() => this.props.onVerseClick(this.props.data)}>
                <td className="ms-font-s small-td td-verse-tag">{this.props.data.book} {this.props.data.chapter}:{this.props.data.verse}</td>
                <td className="ms-font-m-plus td-verse-text">{this.props.data.text}</td>
              </tr>
            </tbody>
          </table>
          <div>
          </div>
        </div>
      </div>
    );
  }
}

export default RelatedVerse;