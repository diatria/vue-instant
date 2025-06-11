import { FormRules } from 'element-plus';
import { Query } from '../types';
type columnType = 'text' | 'textarea' | 'select' | 'password' | 'switch' | 'checkbox' | 'slot' | 'slot:el-form-item' | 'hide';
type __VLS_Props = {
    backUrl?: string;
    columns: Array<{
        name: string;
        label?: string;
        type: columnType;
        grid?: number | Record<string, number>;
        value?: string | number;
        disabled?: boolean;
        select?: {
            options?: Array<unknown>;
            url?: string;
            field_label?: string;
            field_value?: string;
            fetch_on_click?: boolean;
            remote?: boolean;
        };
        placeholder?: string;
    }>;
    id?: number;
    fetchUrl?: string;
    queries?: Query;
    redirectAfterStoreUrl?: (data: unknown) => string;
    rules?: FormRules;
    storeUrl?: string;
    url: string;
};
declare function initializeForm(): void;
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: Partial<Record<string, (_: {
        form: Record<string, string | number>;
    }) => any>> & Partial<Record<string, (_: {
        form: Record<string, string | number>;
    }) => any>>;
    refs: {
        ruleFormRef: unknown;
    };
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<__VLS_Props, {
    initializeForm: typeof initializeForm;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    form: (...args: any[]) => void;
    delete: (...args: any[]) => void;
    store: (...args: any[]) => void;
    update: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onForm?: ((...args: any[]) => any) | undefined;
    onDelete?: ((...args: any[]) => any) | undefined;
    onStore?: ((...args: any[]) => any) | undefined;
    onUpdate?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    ruleFormRef: unknown;
}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
