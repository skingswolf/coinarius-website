import { css } from "@emotion/react";
import MoonLoader from "react-spinners/MoonLoader";
import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";

const loaderOverride = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const StyledNewsStory = styled.div`
  border: red solid 1px;
  margin: 15px 15px 0 15px;
  padding: 13px;
  max-width: 1000px;
`;

const StyledNewsStoryTitle = styled.a`
  // max-width: 900px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  color: black;
  text-decoration: none;
  &:hover {
    color: black;
    text-decoration: none;
  },
  line-height: 20px;
`;

const StyledNewsStoryContainer = styled.div`
  display: grid;
  grid-template-rows: 40% 60%;
  grid-template-columns: 100%;
`;

const StyledNewsTitleContainer = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
  grid-template-rows: 100%;
  justify-self: stretch;
`;

const StyledNewsStoryTopicContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-self: flex-end;
`;

const StyledNewsStoryTopic = styled.span`
  border: 1px red solid;
  font-size: 14px;
`;

const StyledNewsStoryDate = styled.div`
  display: flex;
  justify-content: flex-end;
  align-self: flex-start;
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
    <MoonLoader color="red" loading={news.isLoading} css={loaderOverride} size={150} />
  ) : (
    getNewsfeedItems(news.stories)
  );
};

export default Newsfeed;
