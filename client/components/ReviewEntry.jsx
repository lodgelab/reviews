import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Block = styled.div`
  padding: 25px 0 0 0;
  border-bottom: 1px solid #eee;
`;

const ResponseBlock = styled.div`
  display: flex;
  padding: 25px 0 0 25px;
`;

const ProfilePic = styled.img`
  width: 50px;
  min-width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ResponseProfilePic = styled.img`
  width: 50px;
  min-width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const NameDate = styled.span`
  display: inline-block;
  vertical-align: top;
  padding: 5px 0 25px 20px;
`;

const NameResponseDate = styled.span`
  display: flex;
  flex-direction: column;
  vertical-align: top;
  padding: 5px 0 25px 20px;
`;

const Name = styled.span`
  font-weight: bold;
  padding-bottom: 5px;
`;

const ResponseDate = styled.div`
  padding: 10px 0 0 0;
  color: #888;
`;

const ReadMore = styled.span`
  color: #008489;
`;

class ReviewEntry extends React.Component {
  constructor(props) {
    super(props);

    this.readMore = this.readMore.bind(this);

    this.state = {
      user: {},
      response: '',
      commentExpanded: false,
    };
  }

  readMore() {
    this.setState({
      commentExpanded: true,
    });
  }

  componentDidMount() {
    const { reviewEntry } = this.props;
    const guest = {
      id: reviewEntry.guest_id,
      pic: reviewEntry.guest_picture,
      name: reviewEntry.guest_name
    }
    let reviewResponse = '';

    if (reviewEntry.review_response !== 'null') {
      reviewResponse = reviewEntry.review_response;
    }

    this.setState({
      user: guest,
      response: reviewResponse,
    })
  }

  render() {
    let response = '';
    const { reviewEntry } = this.props;

    if (this.state.response !== '') {
      response = (
        <ResponseBlock>
          <ResponseProfilePic src={this.props.reviewEntry.host_picture} alt="" />
          <NameResponseDate>
            <Name>
              Response from
              {' '}
              {this.props.reviewEntry.host_name}:
            </Name>
            <div>
              {this.state.response}
            </div>
            <ResponseDate>
              {this.props.reviewEntry.date}
            </ResponseDate>
          </NameResponseDate>
        </ResponseBlock>
      );
    }

    let comment = <span>{this.props.reviewEntry.review}</span>
    if (this.props.reviewEntry.review > 200) {
      comment = (
        <span>
          <span>
            {this.props.reviewEntry.review.slice(0, 200)}...
          </span>
          <ReadMore onClick={this.readMore}>
            Read more
          </ReadMore>
        </span>
      );
    }
    if (this.state.commentExpanded) {
      commnet = <span>{this.props.reviewEntry.comment}</span>;
    }

    return (
      <Block>
        <div>
          <ProfilePic src={this.state.user.pic} alt="" />
          <NameDate>
            <Name>
              {this.state.user.name}
            </Name>
            <div>
              {this.props.reviewEntry.date}
            </div>
          </NameDate>
        </div>
        <div>
          {comment}
        </div>
        <div>
          {response}
        </div>
        <br />
      </Block>
    );
  }
}

export default ReviewEntry;
