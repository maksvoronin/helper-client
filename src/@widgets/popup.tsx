import { observer } from "mobx-react";
import { FC } from "react";
import { keyframes, styled } from "styled-components";
import { usePopupStoreContext } from "../@store";

const fade = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const PopupWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  left: 0;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(100px);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fade} 0.3s alternate;
`;

const PopupContainer = styled.div`
  min-width: 300px;
  min-height: 200px;
  border-radius: 12px;
  background: white;
  padding: 20px;
  position: relative;
`;

const PopupTitle = styled.h1`
  color: var(--primaryText);
  text-align: center;
  font-size: 24px;
`;

const PopupInner = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;

const PopupClose = styled.div`
  position: absolute;
  right: -10px;
  top: -10px;
  width: 20px;
  height: 20px;
  border: 1px solid #c7c7c7;
  background-color: #fff;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 3px;
  padding-left: 2px;
  padding-right: 2px;
  transform: rotate(45deg);
  user-select: none;
  cursor: pointer;
`;

const Popup: FC = observer(() => {
  const { title, visible, content, setVisible } = usePopupStoreContext();
  if (!visible) return <></>;
  return (
    <PopupWrapper>
      <PopupContainer>
        <PopupClose onClick={() => setVisible(false)}>+</PopupClose>
        <PopupTitle>{title}</PopupTitle>
        <PopupInner>{content}</PopupInner>
      </PopupContainer>
    </PopupWrapper>
  );
});

export default Popup;
