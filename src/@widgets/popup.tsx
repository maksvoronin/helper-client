import { observer } from "mobx-react";
import { FC } from "react";
import { keyframes, styled } from "styled-components";
import { usePopupStoreContext } from "../@store";
import { CancelButton } from "../@shared";

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
  background: var(--popupWrapperBackground);
  left: 0;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(100px);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fade} 0.3s alternate;
  @media (max-width: 500px) {
    background: var(--pageBackground);
  }
`;

const PopupContainer = styled.div`
  min-width: 420px;
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 12px;
  background: var(--popupBackground);
  padding: 30px 30px;
  position: relative;
  @media(max-width: 500px) {
    min-width: 320px;
  }

  @media(max-width: 400px) {
    min-width: auto;
    max-width: calc(100% - 60px);
  }
`;

const PopupTitle = styled.h1`
  color: var(--primaryText);
  text-align: center;
  font-size: 22px;
  font-weight: 500;
  margin-top: 0;
  padding: 0;
`;

const PopupInner = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 15px;
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
        <PopupInner>
          {content}
          <CancelButton onClick={() => setVisible(false)}>Отменить</CancelButton>
        </PopupInner>
      </PopupContainer>
    </PopupWrapper>
  );
});

export default Popup;
