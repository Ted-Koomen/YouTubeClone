import React, { Component } from 'react';
import SearchBar from './SearchBar';
import _ from 'lodash'
import VideoList from './VideoList'
import VideoDetail from './VideoDetail'
import YTSearch from 'youtube-api-search';
const API_KEY = 'AIzaSyDgPYQDKI56r5wts3AA33_dKmEOFXC2qDw';

export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      videos: [],
      selectedVideo: null
    }
    this.videoSearch('surfboards')
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, videos =>{
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
       });
    });
  }



  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300)
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos}/>
      </div>
    );
  }
}
