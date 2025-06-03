type columnType = 'text' | 'textarea' | 'select' | 'password' | 'switch' | 'checkbox' | 'slot' | 'slot:el-form-item' | 'hide';
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
declare const __VLS_component: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    fetchUrl: {
        type: StringConstructor;
        required: true;
    };
    storeUrl: {
        type: StringConstructor;
        required: true;
    };
    backUrl: {
        type: StringConstructor;
        required: false;
    };
    paramsUrl: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    redirectAfterStoreUrl: {
        type: FunctionConstructor;
        required: false;
    };
    columns: {
        type: {
            (arrayLength: number): {
                name: string;
                label?: string;
                type: columnType;
                url?: string;
                options?: Array<unknown>;
                field_label?: string;
                field_value?: string;
                grid?: number | Record<string, number>;
                value?: string | number;
                disabled?: boolean;
            }[];
            (...items: {
                name: string;
                label?: string;
                type: columnType;
                url?: string;
                options?: Array<unknown>;
                field_label?: string;
                field_value?: string;
                grid?: number | Record<string, number>;
                value?: string | number;
                disabled?: boolean;
            }[]): {
                name: string;
                label?: string;
                type: columnType;
                url?: string;
                options?: Array<unknown>;
                field_label?: string;
                field_value?: string;
                grid?: number | Record<string, number>;
                value?: string | number;
                disabled?: boolean;
            }[];
            new (arrayLength: number): {
                name: string;
                label?: string;
                type: columnType;
                url?: string;
                options?: Array<unknown>;
                field_label?: string;
                field_value?: string;
                grid?: number | Record<string, number>;
                value?: string | number;
                disabled?: boolean;
            }[];
            new (...items: {
                name: string;
                label?: string;
                type: columnType;
                url?: string;
                options?: Array<unknown>;
                field_label?: string;
                field_value?: string;
                grid?: number | Record<string, number>;
                value?: string | number;
                disabled?: boolean;
            }[]): {
                name: string;
                label?: string;
                type: columnType;
                url?: string;
                options?: Array<unknown>;
                field_label?: string;
                field_value?: string;
                grid?: number | Record<string, number>;
                value?: string | number;
                disabled?: boolean;
            }[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
            from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            of<T>(...items: T[]): T[];
            fromAsync<T>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T | PromiseLike<T>> | ArrayLike<T | PromiseLike<T>>): Promise<T[]>;
            fromAsync<T, U>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T> | ArrayLike<T>, mapFn: (value: Awaited<T>, index: number) => U, thisArg?: any): Promise<Awaited<U>[]>;
            readonly [Symbol.species]: ArrayConstructor;
        };
        required: true;
    };
    rules: {
        type: ObjectConstructor;
        required: false;
    };
}>, {
    initializeForm: typeof initializeForm;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    form: (...args: any[]) => void;
    delete: (...args: any[]) => void;
    store: (...args: any[]) => void;
    update: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    fetchUrl: {
        type: StringConstructor;
        required: true;
    };
    storeUrl: {
        type: StringConstructor;
        required: true;
    };
    backUrl: {
        type: StringConstructor;
        required: false;
    };
    paramsUrl: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    redirectAfterStoreUrl: {
        type: FunctionConstructor;
        required: false;
    };
    columns: {
        type: {
            (arrayLength: number): {
                name: string;
                label?: string;
                type: columnType;
                url?: string;
                options?: Array<unknown>;
                field_label?: string;
                field_value?: string;
                grid?: number | Record<string, number>;
                value?: string | number;
                disabled?: boolean;
            }[];
            (...items: {
                name: string;
                label?: string;
                type: columnType;
                url?: string;
                options?: Array<unknown>;
                field_label?: string;
                field_value?: string;
                grid?: number | Record<string, number>;
                value?: string | number;
                disabled?: boolean;
            }[]): {
                name: string;
                label?: string;
                type: columnType;
                url?: string;
                options?: Array<unknown>;
                field_label?: string;
                field_value?: string;
                grid?: number | Record<string, number>;
                value?: string | number;
                disabled?: boolean;
            }[];
            new (arrayLength: number): {
                name: string;
                label?: string;
                type: columnType;
                url?: string;
                options?: Array<unknown>;
                field_label?: string;
                field_value?: string;
                grid?: number | Record<string, number>;
                value?: string | number;
                disabled?: boolean;
            }[];
            new (...items: {
                name: string;
                label?: string;
                type: columnType;
                url?: string;
                options?: Array<unknown>;
                field_label?: string;
                field_value?: string;
                grid?: number | Record<string, number>;
                value?: string | number;
                disabled?: boolean;
            }[]): {
                name: string;
                label?: string;
                type: columnType;
                url?: string;
                options?: Array<unknown>;
                field_label?: string;
                field_value?: string;
                grid?: number | Record<string, number>;
                value?: string | number;
                disabled?: boolean;
            }[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
            from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            of<T>(...items: T[]): T[];
            fromAsync<T>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T | PromiseLike<T>> | ArrayLike<T | PromiseLike<T>>): Promise<T[]>;
            fromAsync<T, U>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T> | ArrayLike<T>, mapFn: (value: Awaited<T>, index: number) => U, thisArg?: any): Promise<Awaited<U>[]>;
            readonly [Symbol.species]: ArrayConstructor;
        };
        required: true;
    };
    rules: {
        type: ObjectConstructor;
        required: false;
    };
}>> & Readonly<{
    onForm?: ((...args: any[]) => any) | undefined;
    onDelete?: ((...args: any[]) => any) | undefined;
    onStore?: ((...args: any[]) => any) | undefined;
    onUpdate?: ((...args: any[]) => any) | undefined;
}>, {
    paramsUrl: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {
    ruleFormRef: unknown;
}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
