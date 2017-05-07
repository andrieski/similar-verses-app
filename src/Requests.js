class Requests {

  static get BASE_URL() {
      return 'https://fierce-dusk-75520.herokuapp.com/';
  }

  static fetchVerse(params) {
    return this.fetch(params, this.BASE_URL + 'verse');
  }

  static fetchRelatedVerses(params) {
    return this.fetch(params, this.BASE_URL + 'related-verses');
  }

  static fetchChapter(params) {
    return this.fetch(params, this.BASE_URL + 'chapter');
  }

  static fetch(params, url) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    return fetch(url, {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(params)
    });
  }
}
export default Requests;
