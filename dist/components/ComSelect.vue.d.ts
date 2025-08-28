type __VLS_Props = {
    disabled?: boolean;
    fetchOnClick?: boolean;
    fieldLabel?: string | ((row: any) => any);
    fieldValue?: string;
    fieldSearchColumn?: string;
    options?: Array<unknown>;
    placeholder?: string;
    remote?: boolean;
    url?: string;
};
declare function changeCollection(values: Record<string, never>[]): void;
declare function fetchingDataFromServer(search?: string): void;
declare const _default: import('vue').DefineComponent<__VLS_Props, {
    changeCollection: typeof changeCollection;
    fetchingDataFromServer: typeof fetchingDataFromServer;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
