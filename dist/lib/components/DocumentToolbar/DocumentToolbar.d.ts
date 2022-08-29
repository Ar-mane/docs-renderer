import type { FC } from "react";
interface IDocumentViewerToolbarProps {
    pageCount: number;
    currentPage: number;
    onZoomIn: () => void;
    onZoomOut: () => void;
    onPageChange: (page: number) => void;
}
declare const DefaultDocumentToolbar: FC<IDocumentViewerToolbarProps>;
export default DefaultDocumentToolbar;
