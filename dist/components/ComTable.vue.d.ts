import { Query } from '../types';
import { RouteLocationRaw } from 'vue-router';
type __VLS_Props = {
    buttonCreateUrl?: () => RouteLocationRaw;
    buttonEditUrl?: (row: {
        id: number | string;
    }) => RouteLocationRaw;
    buttonViewUrl?: (row: {
        id: number | string;
    }) => RouteLocationRaw;
    buttonMoreFieldShow?: boolean;
    buttonFilterShow?: boolean;
    buttonDeleteShow?: boolean;
    columns: Array<{
        field: string;
        label: string;
        value?: unknown;
        type?: 'slot';
        width?: string;
        align?: 'left' | 'center' | 'right';
    }>;
    deleteUrl?: string;
    description?: string;
    paginationShow?: boolean;
    setRelations?: Array<string>;
    setColumns?: Array<string>;
    setQueries?: Query['queries'];
    setOrder?: string;
    style?: {
        popOverWidth: number;
    };
    toolbarShow?: boolean;
    title?: string;
    url: string;
};
declare function changeSelection(values: number[]): void;
declare function refresh(): void;
declare function remove(): void;
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: Partial<Record<string, (_: {
        row: any;
    }) => any>> & {
        title?(_: {}): any;
        'toolbar-1'?(_: {}): any;
        'toolbar-2'?(_: {}): any;
        buttonDelete?(_: {}): any;
        'toolbar-3'?(_: {}): any;
        'toolbar-4'?(_: {}): any;
        action?(_: {
            row: any;
        }): any;
    };
    refs: {
        tableRef: unknown;
    };
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<__VLS_Props, {
    changeSelection: typeof changeSelection;
    refresh: typeof refresh;
    remove: typeof remove;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    onReady: (...args: any[]) => void;
    tableSelections: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onOnReady?: ((...args: any[]) => any) | undefined;
    onTableSelections?: ((...args: any[]) => any) | undefined;
}>, {
    buttonMoreFieldShow: boolean;
    buttonFilterShow: boolean;
    buttonDeleteShow: boolean;
    paginationShow: boolean;
    toolbarShow: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    tableRef: unknown;
}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
