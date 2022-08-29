import { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";
declare type IPdfJsRendererProps = {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    file: string | undefined;
    onDocumentLoadSuccess?: (document: PDFDocumentProxy) => void;
    onDocumentLoadFail?: () => void;
    onPageLoadSuccess?: (page: PDFPageProxy) => void;
    onPageCount?: (pageCount: number) => void;
    onPageLoadFail?: () => void;
    onPageRenderSuccess?: (page: PDFPageProxy) => void;
    onPageRenderFail?: () => void;
    scale?: number;
    rotate?: number;
    page?: number;
    cMapUrl?: string;
    cMapPacked?: boolean;
    workerSrc?: string;
    withCredentials?: boolean;
};
declare type UsePdfJsRendererResult = {
    pdfDocument: PDFDocumentProxy | undefined;
    pdfPage: PDFPageProxy | undefined;
};
declare const usePdfJsRenderer: ({ canvasRef, file, onDocumentLoadSuccess, onPageCount, onDocumentLoadFail, onPageLoadSuccess, onPageLoadFail, onPageRenderSuccess, onPageRenderFail, scale, rotate, page, cMapUrl, cMapPacked, workerSrc, withCredentials, }: IPdfJsRendererProps) => UsePdfJsRendererResult;
export default usePdfJsRenderer;
