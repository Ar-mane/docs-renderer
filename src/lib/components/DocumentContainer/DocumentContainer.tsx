import DocumentViewer from '../DocumentViewer';

const DocumentContainer = ({}) => {
    return <DocumentViewer file={new Blob(['/JavaLesBases.pdf'], { type: 'application/pdf' })} />;
};

export default DocumentContainer;
