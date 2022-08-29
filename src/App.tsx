import { DocumentViewer } from "@lib";
import styled from "styled-components";

function App() {
  const blob = "fileTest.pdf";

  return (
    <Wrapper>
      <DocumentViewer file={blob} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  margin: 2rem;
`;

export default App;
