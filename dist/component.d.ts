declare const _default: import("vue-demi").DefineComponent<{
    canEdit: {
        type: import("vue-demi").PropType<boolean>;
        default: boolean;
    };
    limit: {
        type: import("vue-demi").PropType<number>;
        default: number;
    };
    content: {
        type: import("vue-demi").PropType<string>;
        required: boolean;
    };
    renderHtml: {
        type: import("vue-demi").PropType<boolean>;
        default: boolean;
    };
    row: {
        type: import("vue-demi").PropType<number>;
        default: number;
    };
    type: {
        type: import("vue-demi").PropType<"input" | "textarea">;
        default: string;
    };
    autogrow: {
        type: import("vue-demi").PropType<boolean>;
        default: boolean;
    };
    wrapperClass: {
        type: import("vue-demi").PropType<string>;
        default: string;
        required: boolean;
    };
}, {
    isVue3: boolean;
    editorContainer: import("vue-demi").Ref<any>;
    cssStyle: import("vue-demi").ComputedRef<{
        minHeight: string;
        width: string;
        display: string;
        padding: string;
        lineHeight: string;
        boxSizing: string;
        fontSize: string;
        color: string;
        backgroundColor: string;
        backgroundImage: string;
        border: string;
        borderRadius: string;
        transition: string;
    }>;
    handleFocus: () => void;
    handleBlur: () => void;
    updateData: (e: Event) => void;
    handleComposition: (event: CompositionEvent) => void;
    canEdit: boolean;
    limit: number;
    renderHtml: boolean;
    row: number;
    type: "input" | "textarea";
    autogrow: boolean;
    wrapperClass: string;
    content: string | undefined;
}, unknown, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, {}, string, import("vue-demi").VNodeProps & import("vue-demi").AllowedComponentProps & import("vue-demi").ComponentCustomProps, Readonly<import("vue-demi").ExtractPropTypes<{
    canEdit: {
        type: import("vue-demi").PropType<boolean>;
        default: boolean;
    };
    limit: {
        type: import("vue-demi").PropType<number>;
        default: number;
    };
    content: {
        type: import("vue-demi").PropType<string>;
        required: boolean;
    };
    renderHtml: {
        type: import("vue-demi").PropType<boolean>;
        default: boolean;
    };
    row: {
        type: import("vue-demi").PropType<number>;
        default: number;
    };
    type: {
        type: import("vue-demi").PropType<"input" | "textarea">;
        default: string;
    };
    autogrow: {
        type: import("vue-demi").PropType<boolean>;
        default: boolean;
    };
    wrapperClass: {
        type: import("vue-demi").PropType<string>;
        default: string;
        required: boolean;
    };
}>>, {
    canEdit: boolean;
    limit: number;
    renderHtml: boolean;
    row: number;
    type: "input" | "textarea";
    autogrow: boolean;
    wrapperClass: string;
}, {}>;
export default _default;
