import { css } from "@emotion/react";
import MoonLoader from "react-spinners/MoonLoader";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledNewsStory = styled.div`
  border: red solid 1px;
  margin: 15px 15px 0 15px;
  padding: 15px;
`;

const loaderOverride = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const getNewsfeedItems = (newsStories) => {
  return newsStories.map((newsStory) => (
    <StyledNewsStory key={newsStory.title + Date.now()}>
      <div>
        <div>{newsStory.title}</div>
        <div>
          <span>{newsStory.publisher}</span>
          <span>{newsStory.time}</span>
        </div>
      </div>
    </StyledNewsStory>
  ));
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
