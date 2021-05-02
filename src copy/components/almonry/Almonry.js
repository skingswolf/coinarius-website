import React from "react";
import styled from "styled-components";
import { Layout } from "antd";

import templeFoodImage from "../../res/temple_food.jpg";

const { Content } = Layout;
const headerHeight = 64;
const TempleFoodBackground = styled.div`
  width: 100vw;
  height: calc(100vh - ${headerHeight}px);
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${templeFoodImage});
`;

const Almonry = () => {
  return (
    <Content>
      <TempleFoodBackground />
      <br />
      <br />
      Almonry...
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

export default Almonry;
