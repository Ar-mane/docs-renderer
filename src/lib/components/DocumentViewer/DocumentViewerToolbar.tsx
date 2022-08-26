import {
  PDFToolbar,
  StyledIcon,
  StyledPageController,
  StyledPageLabel,
  StyledZoomController
} from "./DocumentViewer.style";

import type { FC } from "react";
import { AiOutlineZoomIn } from "react-icons/ai";
import { BiMinus, BiPlus } from "react-icons/bi";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface IDocumentViewerToolbarProps {
  pageCount: number;
  currentPage: number;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  onPageChange: (page: number) => void;
}

const DocumentViewerToolbar: FC<IDocumentViewerToolbarProps> = ({
  currentPage,
  pageCount,
  zoom,
  onPageChange,
  onZoomChange,
}) => {
  const canBackward = currentPage > 1;
  const canForward = currentPage < pageCount;
  const canZoomIn = zoom < 2.5;
  const canZoomOut = zoom > 1.2;
  const scale = 0.1;
  return (
    <PDFToolbar>
      <StyledPageController>
        <StyledIcon>
          <BsChevronLeft
            size={15}
            fill={"white"}
            strokeWidth={1}
            onClick={() => {
              canBackward && onPageChange(currentPage - 1);
            }}
          />
        </StyledIcon>
        <StyledPageLabel>
          Page :<span>{`${currentPage} / ${pageCount}`}</span>
        </StyledPageLabel>
        <StyledIcon>
          <BsChevronRight
            size={15}
            fill={"white"}
            strokeWidth={1}
            onClick={() => {
              canForward && onPageChange(currentPage + 1);
            }}
          />
        </StyledIcon>
      </StyledPageController>
      <StyledZoomController>
        <StyledIcon>
          <BiMinus
            size={20}
            fill={"white"}
            onClick={() => {
              canZoomOut && onZoomChange(zoom - scale);
            }}
          />
        </StyledIcon>
        <AiOutlineZoomIn size={20} fill={"white"} />
        <StyledIcon>
          <BiPlus
            size={20}
            fill={"white"}
            onClick={() => {
              canZoomIn && onZoomChange(zoom + scale);
            }}
          />
        </StyledIcon>
      </StyledZoomController>
    </PDFToolbar>
  );
};

export default DocumentViewerToolbar;
