import { Container, Header, Navigation } from "components"
import { FC } from "react";

export const Dashboard: FC = ({children}) => {
  return (
    <div>
      <Navigation />
      <Header>
        <button className="btn">
          Tambah Baru
        </button>
      </Header>
      <Container>
        {children}
      </Container>
    </div>
  );
}