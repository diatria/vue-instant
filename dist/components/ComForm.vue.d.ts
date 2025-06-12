import { FormRules } from 'element-plus';
import { Query } from '../types';
type ColumnSelect = {
    options?: Array<unknown>;
    url?: string;
    field_label?: string;
    field_value?: string;
    fetch_on_click?: boolean;
    remote?: boolean;
};
type ColumnType = 'text' | 'textarea' | 'select' | 'password' | 'switch' | 'checkbox' | 'slot' | 'slot:el-form-item' | 'hide';
interface Column {
    name: string;
    label?: string;
    type: ColumnType;
    grid?: number | Record<string, number>;
    value?: string | number;
    disabled?: boolean;
    select?: ColumnSelect;
    placeholder?: string;
}
interface ComFormProps {
    columns: Column[];
    id?: number;
    fetchUrl?: string;
    paramsUrl?: string;
    queries?: Query;
    rules?: FormRules;
    storeUrl?: string;
    url: string;
}
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
declare const __VLS_component: import('vue').DefineComponent<ComFormProps, {
    initializeForm: typeof initializeForm;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    form: (...args: any[]) => void;
    delete: (...args: any[]) => void;
    back: (...args: any[]) => void;
    onStore: (...args: any[]) => void;
    onUpdate: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<ComFormProps> & Readonly<{
    onForm?: ((...args: any[]) => any) | undefined;
    onDelete?: ((...args: any[]) => any) | undefined;
    onBack?: ((...args: any[]) => any) | undefined;
    onOnStore?: ((...args: any[]) => any) | undefined;
    onOnUpdate?: ((...args: any[]) => any) | undefined;
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
