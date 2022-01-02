import { Container, Footer, Header, Navigation } from "components";
import { FC, HTMLAttributes, ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  Title?: string;
  HeaderContent?: ReactNode;
}

export const Dashboard: FC<Props> = ({ children, className, Title, HeaderContent }) => {
  return (
    <div>
      <Navigation />
      <Header node={Title}>{HeaderContent}</Header>
      <Container className={className + " dashboard-wrap"}>{children}</Container>
      <Footer />
    </div>
  );
};
