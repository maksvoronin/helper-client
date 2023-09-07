import { observer } from "mobx-react";
import { FC } from "react";
import { useThemeStore } from "../@store";
import { styled } from "styled-components";
import Icon from "@mdi/react";
import { mdiWeatherNight, mdiWeatherSunny } from "@mdi/js";

const Container = styled.div`
  width: 32px;
  height: 32px;
  background-color: var(--containerBackground);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  svg {
    transition: opacity 0.2s;
    opacity: 0.3;
    color: var(--primaryText);
  }
  &:hover {
    svg {
      opacity: 0.8;
    }
  }
`;

const ThemeToggler: FC = observer(() => {
  const { theme, setTheme } = useThemeStore();

  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    window.localStorage.theme = theme === "light" ? "dark" : "light";
  };

  return <Container onClick={changeTheme}>{theme === "light" ? <Icon path={mdiWeatherNight} size={0.8} /> : <Icon path={mdiWeatherSunny} size={0.8} />}</Container>;
});

export default ThemeToggler;
