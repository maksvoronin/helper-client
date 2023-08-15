import { observer } from "mobx-react";
import { FC } from "react";
import { styled } from "styled-components";
import { useLoaderStore } from "../@store";

const LoaderContainer = styled.div`
  position: fixed;
  left: 3px;
  top: 3px;
  z-index: 9999;
  width: 24px;
  height: 24px;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const Loader: FC = observer(() => {
  const { isLoaded } = useLoaderStore();
  if(!isLoaded) return <></>
  return (
    <LoaderContainer>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{margin: "auto", background: "none", display: "block", shapeRendering: "auto", animationPlayState: "running", animationDelay: "0s"}}
        width="200px"
        height="200px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle cx="50" cy="50" fill="none" stroke="#85a2b6" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138" style={{animationPlayState: "running", animationDelay: "0s"}}>
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="0.78125s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            style={{animationPlayState: "running", animationDelay: "0s"}}
          ></animateTransform>
        </circle>
      </svg>
    </LoaderContainer>
  );
});

export default Loader;
