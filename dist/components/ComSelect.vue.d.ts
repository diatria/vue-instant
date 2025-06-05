interface RemoteSearch {
    field?: string;
    strict?: boolean;
}
type __VLS_Props = {
    url?: string;
    remoteSearch?: RemoteSearch;
    fieldLabel?: string;
    fieldValue?: string;
    options?: unknown[];
    autoFetch?: boolean;
    disabled?: boolean;
    remote?: boolean;
};
declare function fetchingDataFromServer(): void;
declare const _default: import('vue').DefineComponent<__VLS_Props, {
    fetchingDataFromServer: typeof fetchingDataFromServer;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
