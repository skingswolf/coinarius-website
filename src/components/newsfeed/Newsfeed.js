import React, { useEffect, useState }  from "react";
import styled from "styled-components";

const StyledNewsStory = styled.div`
  border: red solid 1px;
  margin: 15px 15px 0 15px;
  padding: 15px;
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

const Newsfeed = () => {
  const [news, setNews] = useState({
    isLoading: true,
    stories: null
  });

  useEffect(() => {
    const url = "https://coinarius-nlp.herokuapp.com/news-stories";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();

        console.log(json);

        setNews({
          isLoading: false,
          stories: json.news_stories
        });
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return news.isLoading ? "Fetching News Stories ..." : getNewsfeedItems(news.stories);
};

export default Newsfeed;
