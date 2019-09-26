import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';
import Summary from './components/Summary.jsx';
import ReviewList from './components/ReviewList.jsx';

const BaseStyle = styled.div`
  width: 648px;
  color: #484848;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif !important;
  padding: 0 0 0 10%;
`;

class ReviewsModule extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleBackToAllReviews = this.handleBackToAllReviews.bind(this);

    this.state = {
      reviews: [], // arr of all reviews for a particular listing, can use length to show total # reviews
      filteredReviews: [], // arr of filtered reviews based on search bar
      search: '', // used to filter reviews
      accuracy: 0, // average of all accuracy ratings
      communication: 0, // average of all communication ratings
      cleanliness: 0, // average of all cleanliness ratings
      location: 0, // average of all location ratings
      checkin: 0, // average of all checkin ratings
      value: 0, // average of all value ratings
      overall: 0, // average of all the averages
      host: {}, // listing's hosts's info (pic and name)

    };
  }

  // make a function to filter reviews based on state's search string
  handleSearchSubmit(e) {
    e.preventDefault();
    const input = $('#search-reviews').val();
    const filter = this.state.reviews.filter((review) => review.review.includes(input));
    this.setState((prevState) => ({
      filteredReviews: filter,
      search: input,
    }));
  }

  handleBackToAllReviews() {
    this.setState({ filteredReviews: [] });
    $('#search-reviews').val('');
  }

  componentDidMount() {
    // 1. get all the reviews for a particular listing
    let propertyId = window.location.pathname.split('/')[2];

    axios.get(`http://54.219.178.227:3001/api/listings/${propertyId}/reviews`)
      .then((res) => {
      // 2. update the reviews state
        this.setState({
          reviews: res.data,
          host: res.data[0],
        });
      })
      .then(() => {
      // 3. update each rating's state
        if (this.state.reviews.length > 0) {
          let accuracy = 0;
          let communication = 0;
          let cleanliness = 0;
          let location = 0;
          let checkin = 0;
          let value = 0;
          this.state.reviews.forEach((review) => {
            accuracy += review.accuracy;
            communication += review.communication;
            cleanliness += review.cleanliness;
            location += review.location;
            checkin += review.check_in;
            value += review.value;
          });
          const numReviews = this.state.reviews.length;
          this.setState({
            accuracy: Math.round(accuracy / numReviews * 2) / 2,
            communication: Math.round(communication / numReviews * 2) / 2,
            cleanliness: Math.round(cleanliness / numReviews * 2) / 2,
            location: Math.round(location / numReviews * 2) / 2,
            checkin: Math.round(checkin / numReviews * 2) / 2,
            value: Math.round(value / numReviews * 2) / 2,
          });
        }
      })
      .then(() => {
      // 4. update the overall rating
        const overall = this.state.accuracy
        + this.state.communication
        + this.state.cleanliness
        + this.state.location
        + this.state.checkin
        + this.state.value;
        this.setState({
          overall: Math.round(overall / 6 * 2) / 2,
        });
      })
      .catch((error) => {
        console.log(`AXIOS GET LISTING ${propertyId}'S REVIEWS ERROR:`);
        console.log(error);
      });
  }

  render() {
    return (
      <BaseStyle>
        <Summary
          allStates={this.state}
          searchSubmit={this.handleSearchSubmit}
          backToAllReviews={this.handleBackToAllReviews}
        />
        <ReviewList allStates={this.state} />
      </BaseStyle>
    );
  }
}

ReactDOM.render(<ReviewsModule />, document.getElementById('reviews'));
