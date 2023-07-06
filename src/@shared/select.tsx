import { observer } from "mobx-react";
import { FC, useState } from "react";
import { keyframes, styled } from "styled-components";
import { OptionValue } from "../@types";

const fadeOptionContainer = keyframes`
  0% {
    top: 100%;
    opacity: 0;
  }
  100% {
    top: calc(100% + 10px);
    opacity: 1;
  }
`;

const SelectContainer = styled.div`
  width: calc(100% - 30px);
  border-radius: 12px;
  border: 1px solid #c7c7c7;
  height: 46px;
  background: white;
  position: relative;
  padding-left: 15px;
  padding-right: 15px;
`;

const SelectedOption = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  line-height: 46px;
  overflow: hidden;
`;

const Options = styled.div`
  position: absolute;
  width: 100%;
  border-radius: 12px;
  border: 1px solid #c7c7c7;
  left: 0;
  top: calc(100% + 10px);
  animation: ${fadeOptionContainer} 0.2s ease-in forwards alternate;
  background: white;
`;

const Option = styled.div`
  display: flex;
  width: calc(100% - 30px);
  padding-left: 15px;
  padding-right: 15px;
  align-items: center;
  transition: background 0.2s;
  background: white;
  padding-top: 3px;
  padding-bottom: 3px;
  &:hover {
    background: #f7f7f7;
  }
  &:first-child {
    border-radius: 12px 12px 0px 0px;
  }
  &:last-child {
    border-radius: 0px 0px 12px 12px;
  }
`;

export const Select: FC<{ defaultValue?: OptionValue; values?: OptionValue[]; onChange?: (arg0: OptionValue) => any }> = observer(({ defaultValue, onChange, values }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState<OptionValue>(defaultValue || ({ text: "Выберите", value: "undefined" } as OptionValue));
  return (
    <SelectContainer onClick={() => setVisible((prev) => !prev)}>
      <SelectedOption>{selected.text}</SelectedOption>
      {visible && (
        <Options>
          {values &&
            values.map((e) => (
              <Option
                key={Math.random() * 100}
                onClick={() => {
                  onChange && onChange(e);
                  setSelected(e);
                }}
              >
                {e.text}
              </Option>
            ))}
        </Options>
      )}
    </SelectContainer>
  );
});
