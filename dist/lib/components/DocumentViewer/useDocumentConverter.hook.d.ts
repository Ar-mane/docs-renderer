import { ContentType } from './types';
interface UseDocumentConverterResult {
    contentType: ContentType;
    documentBase64: string | undefined;
}
declare const useDocumentConverter: (file: Blob | string) => UseDocumentConverterResult;
export default useDocumentConverter;
