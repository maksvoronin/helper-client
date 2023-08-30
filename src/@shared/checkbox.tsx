import { observer } from "mobx-react";
import { FC, PropsWithChildren, useState } from "react";
import { styled } from "styled-components";

const Container = styled.label`
  display: flex;
  margin: 0;
  padding: 0;
  cursor: pointer;
  input {
    display: none;
  }

  p {
    position: relative;
    display: flex;
    align-items: center;
    gap: 6px;
    user-select: none;
    margin: 0;
    padding: 0;
    color: var(--primaryText);
  }

  p::before {
    content: " ";
    display: block;
    width: 15px;
    height: 15px;
    border-radius: 4px;
    border: var(--checkboxBorder);
    background: transparent;
    transition: background-color 0.2s;
  }
  input:checked + p::before {
    background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M0.5 2.5L3 5L7.5 0.5" stroke="white"/></svg>');
    background-color: var(--activeCheckbox);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 60%;
    border: 1px solid var(--activeCheckbox);
  }
`;

const Checkbox: FC<PropsWithChildren<{ defaultValue?: boolean; onChange?: (bool: boolean) => void }>> = observer(({ defaultValue, onChange, children }) => {
  const [checked, setChecked] = useState<boolean>(defaultValue || false);
  return (
    <Container>
      <input
        type="checkbox"
        defaultChecked={checked}
        onChange={({ target }) => {
          setChecked(target.checked);
          onChange && onChange(target.checked);
        }}
      />
      <p>{children}</p>
    </Container>
  );
});

export default Checkbox;
