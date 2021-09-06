/* eslint-disable no-unused-vars */
import { css } from "@emotion/react";
import BounceLoader from "react-spinners/BounceLoader";
import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";
import {
  synthLightRedOne,
  synthLightRedTwo,
  synthLightGreenOne,
  synthLightGreenTwo,
  synthPurple
} from "../../colourScheme";

const loaderOverride = css`
  display: block;
`;

const StyledSpinnerLoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledNewsStory = styled.div`
  margin: 15px 15px 0 15px;
  height: 120px;
  max-width: 1000px;
  background-color: rgba(0, 0, 0, 0.4);
  border: black solid 2px;
`;

const StyledNewsStoryContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 24% 23% 53%;
  grid-template-columns: 100%;
`;

const StyledNewsStoryTitle = styled.a`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  color: white;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    color: white;
    text-decoration: none;
    font-weight: bold;
  },
  line-height: 20px;
`;

const significanceLevel = 1;
const StyledNewsStoryHeader = styled.div`
  padding-left: 13px;
  padding-right: 13px;
  background: ${(props) => {
    if (props.zScore >= significanceLevel) {
      return `linear-gradient(242.74deg, ${synthLightGreenOne} 0.56%, ${synthLightGreenTwo} 100%)`;
    }

    if (props.zScore <= -1 * significanceLevel) {
      return `linear-gradient(45deg, ${synthLightRedOne} 0%, ${synthLightRedTwo} 100%)`;
    }

    return "#1c2024";
  }};
`;

const StyledNewsTitleContainer = styled.div`
  padding-left: 13px;
  padding-right: 13px;
  display: grid;
  grid-template-columns: 80% 20%;
  grid-template-rows: 100%;
  justify-self: stretch;
  align-items: end;
`;

const StyledNewsStoryTopicContainer = styled.div`
  // padding-left: 13px;
  // padding-right: 13px;
  padding-bottom: 13px;
  display: flex;
  justify-content: space-evenly;
  align-self: flex-end;
`;

const StyledNewsStoryTopic = styled.span`
  background-color: black;
  border: 6px black solid;
  border-radius: 6px;
  font-size: 14px;
`;

const StyledNewsStoryDate = styled.div`
  display: flex;
  justify-content: flex-end;
  align-self: end;
`;

const getNewsfeedItems = (newsStories) => {
  return newsStories.map((newsStory) => {
    const newsStoryId = newsStory.title + Date.now();
    const topics = newsStory.topics.map((topic, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <StyledNewsStoryTopic key={`${topic}-${index}`}>{topic}</StyledNewsStoryTopic>
    ));

    return (
      <StyledNewsStory key={newsStoryId} data-tip data-for={newsStoryId}>
        <StyledNewsStoryContainer>
          <StyledNewsStoryHeader zScore={newsStory.z_score} />
          <StyledNewsTitleContainer>
            <StyledNewsStoryTitle href={newsStory.url} target="_blank" rel="noopener noreferrer">
              {newsStory.title}
            </StyledNewsStoryTitle>
            <StyledNewsStoryDate>{newsStory.date.substring(0, 5)}</StyledNewsStoryDate>
          </StyledNewsTitleContainer>

          <StyledNewsStoryTopicContainer>{topics}</StyledNewsStoryTopicContainer>
        </StyledNewsStoryContainer>
        <ReactTooltip id={newsStoryId} aria-haspopup="true">
          {newsStory.title}
        </ReactTooltip>
      </StyledNewsStory>
    );
  });
};

const nlpAnalyticsUrl = "https://coinarius-nlp.herokuapp.com";

const Newsfeed = () => {
  const [news, setNews] = useState({
    isLoading: true,
    stories: null
  });

  // Fetch data from /news-stories endpoint.
  useEffect(() => {
    const newsStoriesUrl = `${nlpAnalyticsUrl}/news-stories`;

    const fetchData = async () => {
      try {
        const response = await fetch(newsStoriesUrl);
        const jsonResponse = await response.json();

        setNews({
          isLoading: false,
          stories: jsonResponse.news_stories
        });
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return news.isLoading ? (
    <StyledSpinnerLoaderContainer>
      <BounceLoader color={synthPurple} loading={news.isLoading} css={loaderOverride} size={90} />
    </StyledSpinnerLoaderContainer>
  ) : (
    getNewsfeedItems(news.stories)
  );
};

export default Newsfeed;
