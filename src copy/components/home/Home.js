import React from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import styled from "styled-components";
import { Layout } from "antd";

import carouselImageOne from "../../res/landing_page_background.jpg";
import carouselImageTwo from "../../res/buddha.jpg";

const { Content } = Layout;

const headerHeight = 64;
const StyledSliderContainer = styled.div`
  width: 100vw;
  height: calc(100vh - ${headerHeight}px);
`;

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Home = () => {
  const autoplayImageCarousel = true;
  const imageCarouselInterval = 3000; // in ms.
  const areBulletsVisible = false;
  const isParentFilled = true;

  return (
    <Content>
      <StyledSliderContainer>
        <AutoplaySlider
          play={autoplayImageCarousel}
          cancelOnInteraction={false}
          interval={imageCarouselInterval}
          animation="cubeAnimation"
          bullets={areBulletsVisible}
          fillParent={isParentFilled}
        >
          <div data-src={carouselImageOne} />
          <div data-src={carouselImageTwo} />
        </AutoplaySlider>
      </StyledSliderContainer>

      <br />
      <br />

      <div>
        Phasellus consectetur ut velit vel condimentum. Nullam varius odio nec ornare molestie.
        Vivamus massa ipsum, eleifend eu ipsum eget, lacinia maximus erat. Proin sodales auctor
        tellus, ac porttitor velit ornare in. Proin aliquam neque et ante porta, sed sollicitudin
        ante commodo. Aliquam erat volutpat. Sed nisi augue, gravida sit amet viverra at, sodales
        vitae velit. Sed quis turpis dolor. Ut eget blandit metus, id suscipit elit. Integer
        placerat, urna ut dapibus semper, sapien metus sodales eros, eget eleifend quam lectus at
        sem. Nunc vehicula tempor laoreet. Sed quis magna mollis, vehicula quam id, accumsan lorem.
        Suspendisse gravida ultricies diam, sed feugiat dui dapibus ut. In euismod placerat elit ut
        mollis. Mauris urna magna, rutrum eu mauris ut, finibus rutrum neque. Morbi tristique eget
        orci ut aliquet.
      </div>
      <br />
      <div>
        Integer placerat, urna ut dapibus semper, sapien metus sodales eros, eget eleifend quam
        lectus at sem. Nunc vehicula tempor laoreet. Sed quis magna mollis, vehicula quam id,
        accumsan lorem. Suspendisse gravida ultricies diam, sed feugiat dui dapibus ut. In euismod
        placerat elit ut mollis. Mauris urna magna, rutrum eu mauris ut, finibus rutrum neque. Morbi
        tristique eget orci ut aliquet. Phasellus consectetur ut velit vel condimentum. Nullam
        varius odio nec ornare molestie. Vivamus massa ipsum, eleifend eu ipsum eget, lacinia
        maximus erat. Proin sodales auctor tellus, ac porttitor velit ornare in. Proin aliquam neque
        et ante porta, sed sollicitudin ante commodo. Aliquam erat volutpat. Sed nisi augue, gravida
        sit amet viverra at, sodales vitae velit. Sed quis turpis dolor. Ut eget blandit metus, id
        suscipit elit.
      </div>
    </Content>
  );
};

export default Home;
