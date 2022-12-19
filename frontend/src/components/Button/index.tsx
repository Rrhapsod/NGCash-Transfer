import { ButtonHTMLAttributes } from "react";
import { IconType } from "react-icons";
import { Container } from "./styles";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: IconType;
}

export function Button({ title, icon: Icon, ...rest }: ButtonProps) {
  return (
    <Container type="button" {...rest}>
      {Icon && <Icon size={20} />}
      {title}
    </Container>
  );
}
