import { Document, Page } from 'react-pdf';
import { TransformWrapper } from 'react-zoom-pan-pinch';
import styled from 'styled-components';

export const StyledWrapper = styled.div`
    padding: 26px 30px;
    height: 100vh;
    box-sizing: border-box;
`;

export const StyledGridItem = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
    height: 100%;
    width: 100%;
`;

export const StyledScrollContainer = styled(TransformWrapper)``;
export const StyledDocument = styled(Document)``;
export const StyledPage = styled(Page)``;

export const PDFToolbar = styled.div`
    display: flex;
    flex-direction: row;
    position: absolute;
    bottom: 100px;
    align-items: center;
    height: 42px;
    column-gap: 30px;
    padding: 0 5px;
    background: '#e40707';
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
`;

export const StyledIcon = styled.div`
    border-radius: 4px;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const StyledPageController = styled.div`
    display: flex;
    flex-direction: row;
    column-gap: 6px;
    align-items: center;
`;
export const StyledZoomController = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 4px;
`;

export const StyledPageLabel = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 12px;
    column-gap: 6px;

    span {
        display: flex;
        column-gap: 5px;
        flex-direction: row;
        align-items: center;
        color: wheat;
    }
`;
