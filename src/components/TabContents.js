import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

// 다시 시도..
// const AnimatedDiv = styled.div`
//   opacity: 0;
//   transition: opacity 0.5s;
//   ${props => props.fade && css`opacity: 1`};
// `;

function TabContents(props) {
  const { showTabIndex } = props; 

  // 10. 컴포넌트에 전환(transition) 효과 주기
  // const [fade, setFade] = useState('');

  // useEffect(() => {
  //   setTimeout(() => {
  //     setFade('opacity-end');
  //   }, 100);

  //   return () => {
  //     setFade('');
  //   };
  // }, [showTabIndex]);

  let tabContent;
  if (showTabIndex === 0) {
    tabContent = <div>탭 내용1</div>;
  } else if (showTabIndex === 1) {
    tabContent = <div>탭 내용2</div>;
  } else if (showTabIndex === 2) {
    tabContent = <div>탭 내용3</div>;
  } else if (showTabIndex === 3) {
    tabContent = <div>탭 내용4</div>;
  }

  return (
    // 10. 컴포넌트에 전환(transition) 효과 주기
    // <div className={"opacity-start " + fade}>
    <div>
      {tabContent}
    </div>

    // 시도..
    // <AnimatedDiv fade={fade}>
    //   {tabContent}
    // </AnimatedDiv>
  );
};

export default TabContents;