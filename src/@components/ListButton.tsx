import { mdiChevronRight } from "@mdi/js";
import Icon from "@mdi/react";
import { observer } from "mobx-react";
import { FC, PropsWithChildren, useState } from "react";
import { styled } from "styled-components";

export const SidebarListButton = styled.div`
  width: calc(100% - 20px);
  padding: 8px 10px;
  max-height: 32px;
  display: flex;
  background: transparent;
  align-items: center;
  border-radius: 8px;
  font-size: 13px;
  user-select: none;
  cursor: pointer;
  text-decoration: none;
  color: black;
  &:hover {
    background-color: rgba(100, 100, 100, 0.1);
  }
  &:active {
    transform: scale(1);
  }
  svg {
    margin-right: 7px;
    color: var(--accentColor);
    width: 20px;
    height: 20px;
  }
  svg.arrow {
    color: #838383;
    margin-left: auto;
    margin-right: 0;
    transition: transform 0.2s;
    &.openned {
      transform: rotate(90deg);
    }
  }
`;

export const Buttons = styled.div`
  margin-left: 27px;
`;

const ListButton: FC<PropsWithChildren<{ btnIcon?: string; marginButtons?: number; btnText: string; style?: object }>> = observer(({ style, btnIcon, marginButtons, btnText, children }) => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <div about={"List"}>
      <SidebarListButton onClick={() => setVisible((prev) => !prev)} style={style} >
        {btnIcon && <Icon path={btnIcon} size={"20px"} />}
        <span>{btnText}</span>
        <Icon path={mdiChevronRight} size={"20px"} className={`arrow ${visible && "openned"}`} />
      </SidebarListButton>
      {visible && <Buttons style={marginButtons !== 0 ? {marginLeft: marginButtons} : {}}>{children}</Buttons>}
    </div>
  );
});

export default ListButton;
