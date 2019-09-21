import React from 'react';
import ReviewEntry from './ReviewEntry.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let displayReviews = this.props.allStates.reviews;

    if (this.props.allStates.filteredReviews.length > 0) {
      displayReviews = this.props.allStates.filteredReviews;
    }

    return(
      <div>
        {displayReviews.map(review => <ReviewEntry key={review.id} reviewEntry={review} hostInfo={this.props.allStates.host} />)}
      </div>
    )
  }
}

export default ReviewList;