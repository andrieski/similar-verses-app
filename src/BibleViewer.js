import React from 'react';
import MySelector from './MySelector';
import DropdownData from './DropdownData';
import {Dropdown} from 'office-ui-fabric-react/lib/Dropdown';
import {
  Spinner,
  SpinnerSize
} from 'office-ui-fabric-react/lib/Spinner';
import Requests from './Requests';
import './BibleViewer.css';

class BibleViewer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            verses: [],
            isLoading: false
        }

        this.onBookChange = this.onBookChange.bind(this);
        this.onChapterChange = this.onChapterChange.bind(this);
        this.onVerseChange = this.onVerseChange.bind(this);
    }

    getBooks() {
        return this.convertListToDropdownList(DropdownData.getBooks());
    }

    getChapters(book) {
        return this.convertListToDropdownList(DropdownData.getChapters(book));
    }

    setVerses(book, chapter) {
        this.setState({
            isLoading: true
        })
        var _this = this;
        Requests.fetchChapter({book: book, chapter: chapter}).then(function (response) {
            response.json().then(function (data) {

                var verses = data
                    .response
                    .map(function (item) {
                        return {
                            key: item.verse,
                            text: item.text
                        }
                    });
                _this.setState({
                    verses: verses,
                    isLoading: false
                })
            });
        });
    }

    convertListToDropdownList(list) {
        return list.map(function (item) {
            return {key: item, text: item}
        })
    }

    onBookChange(item) {
        var selectedItem = {
            book: item,
            chapter: null,
            verse: null
        }
        this.setState({
            verses: []
        }, function() {
            this.props.onSelectionChange(selectedItem)
        })
        
    }

    onChapterChange(item) {
        var selectedItem = {
            book: this.props.selectedItem.book,
            chapter: item,
            verse: null
        }

        // Chapter changed, so we need new list of verse
        var book = selectedItem.book.key;
        var chapter = Number(selectedItem.chapter.key);
        this.setVerses(book, chapter);

        this.props.onSelectionChange(selectedItem);
    }

    onVerseChange(item) {
        var selectedItem = {
            book: this.props.selectedItem.book,
            chapter: this.props.selectedItem.chapter,
            verse: item
        }
        this.props.onSelectionChange(selectedItem);
    }

    componentDidMount() {
        // todo, check if verses can be set
        this.setVerses(this.props.selectedItem.book.key, Number(this.props.selectedItem.chapter.key))
    }

    render() {
        // books and chapters can be calculated from props, so we do that here, unlike verses, which require an api call
        var books = [];
        var chapters = [];
        books = this.getBooks();
        if (this.props.selectedItem.book && this.props.selectedItem.book.key) {
            chapters = this.getChapters(this.props.selectedItem.book.key);
        }
        
        return (
            <div>
                <div className="float-container">
                    <div className="bible-dropdown-container">
                        <Dropdown
                            label='Book:'
                            selectedKey={this.props.selectedItem.book && this.props.selectedItem.book.key}
                            onChanged={this.onBookChange}
                            options={books}/>
                    </div>
                    <div className="bible-dropdown-container">
                        <Dropdown
                            label='Chapter:'
                            selectedKey={this.props.selectedItem.chapter && this.props.selectedItem.chapter.key}
                            onChanged={this.onChapterChange}
                            options={chapters}/>
                    </div>
                </div>
                <div>
                    {
                        this.state.isLoading ? (
                            <Spinner className="ms-font-m" size={ SpinnerSize.large } label='Loading Verses...' />
                        ) : (
                            <MySelector
                                header="Verse:"
                                items={this.state.verses}
                                autoHeightMax={this.props.autoHeightMax}
                                width={800}
                                formatItem={this.props.formatItem}
                                selectedKey={this.props.selectedItem.verse && this.props.selectedItem.verse.key}
                                onChanged={this.onVerseChange}/>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default BibleViewer;