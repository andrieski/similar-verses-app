import React from 'react';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import {
  Persona,
  PersonaInitialsColor,
} from 'office-ui-fabric-react/lib/Persona';
import RelatedVerseList from './RelatedVerseList';
import Explanation from './Explanation';
import BibleViewer from './BibleViewer';
import Utilities from './Utilities';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      relatedVerses: [],
      // or Mathew 4:7
      selectedItem: {
        book: {key: 'John', text: 'John'},
        chapter: {key: 3, text: 3},
        verse: {key: 3, text: 3}
      },
      openExplanation: false
    };

    this.onSelectionChange = this.onSelectionChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  onSelectionChange(newSelection) {
    this.setState({
      selectedItem: newSelection
    });
  }

  showModal() {
    this.setState({ openExplanation: true });
  }

  closeModal() {
    this.setState({ openExplanation: false });
  }

  render () {
    return (
      <div className="app">
        <div className="explanation-trigger">
          <DefaultButton
            icon="Info"
            text="Explanation"
            onClick={this.showModal}
          />
          <DefaultButton
            icon="Code"
            text="View on Github"
            className="github-btn"
            onClick={() => {location.href = "https://github.com/andrieski/similar-verses-app";}}
          />
        </div>
        <Persona className="app-step" imageInitials='1' initialsColor={ PersonaInitialsColor.magenta }>
          <PrimaryButton icon="Completed" className="disabled-primary app-step-button" text='Pick a verse'/>
        </Persona>
        <div className="segment">
          <BibleViewer 
            autoHeightMax={350}
            selectedItem={this.state.selectedItem} 
            onSelectionChange={this.onSelectionChange}
            formatItem={Utilities.formatVerseInTable}
            />
        </div>
        <RelatedVerseList searchItem={this.state.selectedItem}/>
        {
          // without this bool check, React will throw an error: Maximum call stack size exceeded
          this.state.openExplanation && (
          <Modal
              isOpen={ this.state.openExplanation }
              onDismiss={this.closeModal}
              isBlocking={ false }
              containerClassName='modal-container'>
              <div className='modal-header ms-fontWeight-light ms-fontSize-xxl icon-bg-dark'>
                <p>Explanation</p>
              </div>
              <div className='modal-body'>
                <Explanation/>     
              </div>
          </Modal>
          )
        }

      </div>
    );
  }
}

export default App;