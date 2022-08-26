import styled from 'styled-components';
import { DocumentViewer } from './lib';

function App() {
    const blob = 'test.pdf';

    return (
        <div className="App">
            <DocumentViewer file={blob} />
        </div>
    );
}

const Wrapper = styled.div`
    margin: 2rem;
    display: flex;
    justify-content: center;
`;

export default App;
