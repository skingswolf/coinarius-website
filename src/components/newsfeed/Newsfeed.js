import { css } from "@emotion/react";
import io from "socket.io-client";
import React, { useEffect, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import styled from "styled-components";

const StyledNewsStory = styled.div`
  border: red solid 1px;
  margin: 15px 15px 0 15px;
  padding: 15px;
`;

// Can be a string as well. Need to ensure each key-value pair ends with ;
const loaderOverride = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const getNewsfeedItems = (newsStories) => {
  return newsStories.map((newsStory) => (
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
};

const nlpAnalyticsUrl = "https://coinarius-nlp.herokuapp.com";
let socket = null;

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

  // Connect and fetch data from coinarius-nlp WebSocket service.
  useEffect(() => {
    console.log("Initialising socket.");
    socket = io(nlpAnalyticsUrl);
    socket.on("connect", () => {
      console.log("Successfully connected to Coinarius NLP WebSocket service.");
      socket.emit("register", { data: "register" });
    });

    socket.on(
      "fresh_nlp_analytics",
      (msg) => {
        console.log("Fresh data received from Coinarius NLP WebSocket service.");
        const updatedNewsStories = msg.news_stories;

        setNews((n) => ({ ...n, stories: updatedNewsStories.concat(n.stories) }));
      },
      []
    );

    // eslint-disable-next-line consistent-return
    return () => {
      console.log("Disconnecting from Coinarius NLP WebSocket service.");
      socket.disconnect();
    };
  }, []);

  return news.isLoading ? (
    <MoonLoader color="red" loading={news.isLoading} css={loaderOverride} size={150} />
  ) : (
    getNewsfeedItems(news.stories)
  );
};

export default Newsfeed;
