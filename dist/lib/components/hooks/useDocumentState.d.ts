import { RenderingControll, RenderingState } from '../..';
declare type UseDocumentStateResult = {
    controll: RenderingControll;
    state: RenderingState;
};
declare const useDocumentState: (zoomConfig?: import('../..').ZoomConfig) => UseDocumentStateResult;
export default useDocumentState;
