import { observer } from "mobx-react";
import { PageProps } from "../@types";
import { DefaultLayout } from "../@layouts";
import { FC } from "react";
import { styled } from "styled-components";
import { Logo } from "../@assets";
import { useNavigate } from "react-router-dom";

const WelcomeWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WelcomePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;

  h1 {
    font-size: 64px;
    font-weight: bold;
    color: #333;
    margin-top: 60px;
    margin-bottom: 0;

    @media (max-width: 580px) {
      font-size: 42px;
    }
  }

  button {
    border-radius: 12px;
    color: white;
    background: #4978ff;
    padding: 13px 20px;
    gap: 10px;
    border: none;
    margin-top: 64px;
    font-size: 16px;
    cursor: pointer;
  }

  p {
    max-width: 400px;
    text-align: center;
    font-size: 18px;
    margin-top: 64px;
    line-height: 1.51;
    @media (max-width: 580px) {
      font-size: 16px;
    }
  }

  svg {
    width: 80px;
    height: 80px;
    @media (max-width: 580px) {
      width: 70px;
      height: 70px;
    }
  }
`;

const Welcome: FC<PageProps> = observer(({ title }) => {
  const navigate = useNavigate();
  return (
    <DefaultLayout title={title}>
      <WelcomeWrapper>
        <WelcomePage>
          <Logo />
          <h1>Helper</h1>
          <button onClick={() => navigate("/login")}>Войти в систему</button>
          <p>Удобный помощник поиска неисправностей, обмена опытом и решения проблем для работников РЖД</p>
        </WelcomePage>
      </WelcomeWrapper>
    </DefaultLayout>
  );
});

export default Welcome;
