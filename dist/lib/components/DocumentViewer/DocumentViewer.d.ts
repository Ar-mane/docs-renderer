import { ZoomConfig } from '../..';
import type { FC } from "react";
interface IDocumentViewerProps {
    file: Blob | string;
    ZoomConfig?: ZoomConfig;
}
declare const DocumentViewer: FC<IDocumentViewerProps>;
export default DocumentViewer;
