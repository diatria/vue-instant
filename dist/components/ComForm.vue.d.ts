import { FormRules, UploadInstance } from 'element-plus';
import { ComFormColumn, ComFormProps as ComFormPropsType } from '../types';
interface ComFormProps {
    columns: ComFormColumn[];
    id?: number;
    description?: string;
    fetchUrl?: string;
    paramsUrl?: string;
    queries?: ComFormPropsType['queries'];
    relations?: string[];
    rules?: FormRules;
    storeUrl?: string;
    title?: string;
    url: string;
}
declare function initializeForm(): void;
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: Partial<Record<string, (_: {
        form: Record<string, string | number | UploadInstance | (string | number)[] | (() => string)>;
    }) => any>> & Partial<Record<string, (_: {
        form: Record<string, string | number | UploadInstance | (string | number)[] | (() => string)>;
    }) => any>> & {
        title?(_: {}): any;
        buttonStore?(_: {}): any;
    };
    refs: {
        ruleFormRef: unknown;
    };
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<ComFormProps, {
    initializeForm: typeof initializeForm;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    form: (...args: any[]) => void;
    delete: (...args: any[]) => void;
    back: (...args: any[]) => void;
    onStored: (...args: any[]) => void;
    onUpdated: (...args: any[]) => void;
    onChangeItem: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<ComFormProps> & Readonly<{
    onForm?: ((...args: any[]) => any) | undefined;
    onDelete?: ((...args: any[]) => any) | undefined;
    onBack?: ((...args: any[]) => any) | undefined;
    onOnStored?: ((...args: any[]) => any) | undefined;
    onOnUpdated?: ((...args: any[]) => any) | undefined;
    onOnChangeItem?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    ruleFormRef: unknown;
}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
