import { Query } from '../types';
import { RouteLocationRaw } from 'vue-router';
type __VLS_Props = {
    buttonEditUrl?: (row: {
        id: number | string;
    }) => RouteLocationRaw;
    buttonViewUrl?: (row: {
        id: number | string;
    }) => RouteLocationRaw;
    columns: Array<{
        field: string;
        label: string;
        value?: unknown;
        type?: 'slot';
        width?: string;
        align?: 'left' | 'center' | 'right';
    }>;
    setRelations?: Array<string>;
    setColumns?: Array<string>;
    setQueries?: Query['queries'];
    setOrder?: string;
    url: string;
    deleteUrl?: string;
};
declare function refresh(): void;
declare function remove(): void;
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: Partial<Record<string, (_: {
        row: any;
    }) => any>> & {
        buttonDelete?(_: {}): any;
        action?(_: {
            row: any;
        }): any;
    };
    refs: {};
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<__VLS_Props, {
    refresh: typeof refresh;
    remove: typeof remove;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    tableSelections: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onTableSelections?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
