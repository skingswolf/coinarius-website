import React from "react";
import styled from "styled-components";

import newsStories from "./newsStories";

const StyledNewsStory = styled.div`
  border: red solid 1px;
  margin: 15px 15px 0 15px;
  padding: 15px;
`;

const newsfeedItems = newsStories.map((newsStory) => (
  <StyledNewsStory key={newsStory.title}>
    <div>
      <div>{newsStory.title}</div>
      <div>
        <span>{newsStory.publisher}</span>
        <span>{newsStory.time}</span>
      </div>
    </div>
  </StyledNewsStory>
));

const Newsfeed = () => newsfeedItems;

export default Newsfeed;
