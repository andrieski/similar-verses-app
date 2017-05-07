import React from 'react'
import RelatedVerse from './RelatedVerse';
import Requests from './Requests';
import {
  Persona,
  PersonaInitialsColor,
} from 'office-ui-fabric-react/lib/Persona';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import {
  Spinner,
  SpinnerSize
} from 'office-ui-fabric-react/lib/Spinner';
import BibleViewer from './BibleViewer';
import Utilities from './Utilities';
import './RelatedVerseList.css';

class RelatedVerseList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            relatedVerses: [],
            showModal: false,
            bibleViewerVerse: null,
            isLoading: true
        }

        this.findSimilarVerses = this.findSimilarVerses.bind(this);
        this.openVersesInContext = this.openVersesInContext.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    allowSearch() {
        if (!this.props.searchItem) return false;
        return this.props.searchItem.book && this.props.searchItem.chapter && this.props.searchItem.verse;
    }

    findSimilarVerses() {
        if (!this.allowSearch()) return;
        this.setState({
            isLoading: true
        })
        var params = {
            book: this.props.searchItem.book.key,
            chapter: Number(this.props.searchItem.chapter.key),
            verse: Number(this.props.searchItem.verse.key)
        }
        var _this = this;
        Requests.fetchRelatedVerses(params).then(function(response) {
            response.json().then(function(data) {
                _this.setState({
                    relatedVerses: data.response,
                    isLoading: false
                })
            });
        });
    }    

    componentDidMount() {
        this.findSimilarVerses();
    }

    openVersesInContext(selectedItem) {
        this.setState({
            bibleViewerVerse: this.formatSelectedItem(selectedItem),
            showModal: true
        })
    }

    closeModal() {
        this.setState({
            showModal: false,
            bibleViewerVerse: null
        });
    }

    formatSelectedItem(item) {
        return {
            book: {
                key: item.book,
                text: item.book
            },
            chapter: {
                key: item.chapter,
                text: item.chapter
            },
            verse: {
                key: item.verse,
                text: item.verse
            }
        }
    }

    render() {
        var enableSearch = this.allowSearch();
        return (
            <div>
                <div className="segment">
                    <Persona imageInitials='2' className="app-step" primaryText='' initialsColor={ PersonaInitialsColor.magenta } >
                        <PrimaryButton
                        className="app-step-button"
                        disabled={ !enableSearch }
                        text={enableSearch ? 'Find Similar Verses': 'Pick a verse first' }
                        icon='Search'
                        onClick={ this.findSimilarVerses } />
                    </Persona>
                </div>  
                <div className="segment related-verse-container">
                {
                    this.state.relatedVerses.length > 0 &&
                    (
                    <div className="row">
                        <div className="col-xs-12 ms-font-s-plus">
                        <div className="related-verses-header ms-fontWeight-semibold">
                            <i className="ms-Icon ms-Icon--TouchPointer" aria-hidden="true"></i>
                            Click on a verse to see it in context
                        </div>
                        </div>
                    </div>
                    )
                }
                {
                    this.state.isLoading ? (
                        <Spinner className="ms-font-m" size={ SpinnerSize.large } label='Loading Related Verses...' />
                    ) : 
                    this.state.relatedVerses.slice(0, 15).map(function(item, index) {
                        return <RelatedVerse onVerseClick={this.openVersesInContext} data={item} key={[item.book, item.chapter, item.verse].join('-')}/>
                    }, this)

                }
                </div>  
                {
                    this.state.showModal && this.state.bibleViewerVerse !== null && (
                    <Modal
                    isOpen={ this.state.showModal }
                    onDismiss={ this.closeModal }
                    isBlocking={ false }
                    containerClassName='modal-container'>
                    <div className='modal-header ms-fontWeight-light ms-fontSize-xxl icon-bg-dark'>
                        <p>Related Verse In Context</p>
                    </div>
                    <div className='modal-body'>
                        <BibleViewer 
                        autoHeightMax={''}
                        selectedItem={this.state.bibleViewerVerse} 
                        formatItem={Utilities.formatVerseInTable}
                        onSelectionChange={(item) => this.setState({bibleViewerVerse: item})}/>   
                        <br/> <br/>
                    </div>
                    </Modal>                        
                    )
                }                            
            </div>
        )
    }
}

export default RelatedVerseList;