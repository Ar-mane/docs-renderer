import { useEffect, useRef, useState } from 'react';

import { StyledDocument, StyledGridItem, StyledPage, StyledScrollContainer, StyledWrapper } from './DocumentViewer.style';
import useDocumentConverter from './useDocumentConverter.hook';

import type { FC } from 'react';
import { pdfjs } from 'react-pdf';
import { TransformComponent } from 'react-zoom-pan-pinch';
import DocumentViewerToolbar from './DocumentViewerToolbar';
import { ContentType } from './types';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface IDocumentViewerProps {
    file: Blob | string;
}

const DocumentViewer: FC<IDocumentViewerProps> = ({ file }) => {
    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [zoom, setZoom] = useState(1.2);

    const { documentBase64, contentType } = useDocumentConverter(file);
    const ref = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.setAttribute('height', `${zoom * 82}%`);
        }
    }, [zoom]);

    return (
        <StyledWrapper>
            <StyledGridItem>
                <StyledScrollContainer initialScale={1} initialPositionX={200} initialPositionY={100}>
                    <TransformComponent>
                        {contentType === ContentType.PDF ? (
                            <StyledDocument
                                file={documentBase64}
                                onLoadSuccess={(pdf) => {
                                    setPageCount(pdf.numPages);
                                }}
                            >
                                <StyledPage pageNumber={currentPage} scale={zoom} />
                            </StyledDocument>
                        ) : (
                            <img ref={ref} src={documentBase64} />
                        )}
                    </TransformComponent>
                </StyledScrollContainer>
                <DocumentViewerToolbar
                    currentPage={currentPage}
                    pageCount={pageCount}
                    zoom={zoom}
                    onPageChange={setCurrentPage}
                    onZoomChange={setZoom}
                />
            </StyledGridItem>
        </StyledWrapper>
    );
};

export default DocumentViewer;
