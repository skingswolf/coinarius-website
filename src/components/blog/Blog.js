import React from "react";
import styled from "styled-components";
import { Layout } from "antd";

const { Content } = Layout;

const StyledContent = styled(Content)`
  text-align: left;
  margin: 0 90px 0 90px;
  padding: 30px 30px 0 30px;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const Blog = () => (
  <StyledContent>
    <h1>Accept that you are always changing, moment to moment</h1>
    <br />
    <br />
    <p>
      The impermanence of what you regard yourself as, is a key concept in Buddhism. Lord Buddha has
      told us that what we think of as ‘self,’ is in a state of constant change due to new thoughts,
      new perceptions and so forth.
    </p>
    <br />
    <p>
      <u>What this means is:</u>
      <br />
      <br />
      Although you may have done things that you wish you had not done, with each moment you have a
      chance to rectify the situation. Because with each moment our bodies are changing and our
      minds are changing.
    </p>
    <p>
      But, some of us love playing the:
      <br />
      &nbsp;&nbsp;&nbsp;&nbsp;‘I am so wicked.” I am such a bad person,’
      <br />
      &nbsp;&nbsp;&nbsp;&nbsp;‘I am such a loser.’ I am so lazy,’
      <br />
    </p>
    <p>
      Sometimes, we love hanging on to old wounds because it gets us the attention of others, an
      excuse to wallow in doing absolutely nothing that requires effort. Sometimes, we love hanging
      on to old wounds because the experience that caused them were so traumatic – and now we are
      paralysed with fear.
      <br />
      <br />
      Sometimes, we love hanging on to old wounds because it gives us a chance to indulge in
      retaliation. Some people get very excited about revenge and retaliation. It makes them feel in
      charge in a weird way. Sometimes we love hanging on to old wounds so that we can have a
      non-stop bath of self-pity.
    </p>
    <p>
      You think you have got a rough deal?
      <br />
      <br />
      Imagine you are a child scavenging for food in rubbish heaps in order to feed your family.
      Imagine you have a little baby to feed, but your milk has run dry. Your scant family income is
      spent on alcohol by your violent, alcoholic, crazy spouse. So, the baby cries, you cry and he
      beats you up. You are trapped. These visualisations should put your situation in perspective.
      My advice is always go for the optimistic view – ‘IT COULD HAVE BEEN WORSE.’
    </p>
    <p>
      As a Buddhist, you know that you yourself are constantly subject to change, moment to moment.
    </p>
    <p>
      Make this change a beneficial one, by taking charge of each moment of change. Forget your old
      self, make an effort and become the glorious new self you always wanted to be. Accept that you
      are always changing, everything around you is always changing. Moment to moment.
    </p>
    <p>
      Therefore each moment is an opportunity to do nothing for the better
      <br />
      &nbsp;&nbsp;&nbsp;&nbsp;Or...
      <br />
      Each moment is blessed with an opportunity to exact a beneficial change.
    </p>
    <p>
      <br />
      <em>Chandrakirthi</em>
      <br />
      09–02-2017
    </p>
  </StyledContent>
);

export default Blog;
