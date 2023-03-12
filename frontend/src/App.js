import { useState } from "react";
import styled from "styled-components";
import Navigation from "./Components/Navigation";
import Dashboard from "./Components/Dashboard";
import Income from "./Components/Income";
import Expenses from "./Components/Expenses";
import { MainLayout } from "./styles/Layouts";
import { useGlobalContext } from "./context/globalContext";

function App() {
  const [active, setActive] = useState(1);

  const g = useGlobalContext();
  console.log(g);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Dashboard />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <AppStyled>
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>{displayData()}</main>
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%);
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
