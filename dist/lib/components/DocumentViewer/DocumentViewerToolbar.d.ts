import type { FC } from "react";
interface IDocumentViewerToolbarProps {
    pageCount: number;
    currentPage: number;
    zoom: number;
    onZoomChange: (zoom: number) => void;
    onPageChange: (page: number) => void;
}
declare const DocumentViewerToolbar: FC<IDocumentViewerToolbarProps>;
export default DocumentViewerToolbar;
