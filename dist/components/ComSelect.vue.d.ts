import { ComSelectProps } from '../types';
type __VLS_Props = ComSelectProps & {
    modelValue?: any;
};
declare function changeCollection(values: Record<string, any>[]): void;
declare function fetchingDataFromServer(search?: string): void;
declare const _default: import('vue').DefineComponent<__VLS_Props, {
    changeCollection: typeof changeCollection;
    fetchingDataFromServer: typeof fetchingDataFromServer;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {
    fetchOnClick: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
