declare const _default: import("vue-demi").DefineComponent<{
    canEdit: {
        type: import("vue-demi").PropType<boolean>;
        required: true;
        default: boolean;
    };
    limit: {
        type: import("vue-demi").PropType<number>;
        required: true;
        default: number;
    };
    content: {
        type: import("vue-demi").PropType<string>;
        required: true;
    };
    renderHtml: {
        type: import("vue-demi").PropType<boolean>;
        required: true;
        default: boolean;
    };
}, {}, unknown, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, {
    "update:content": (str: string) => void;
    focus: (isFoucs: boolean) => void;
}, string, import("vue-demi").VNodeProps & import("vue-demi").AllowedComponentProps & import("vue-demi").ComponentCustomProps, Readonly<import("vue-demi").ExtractPropTypes<{
    canEdit: {
        type: import("vue-demi").PropType<boolean>;
        required: true;
        default: boolean;
    };
    limit: {
        type: import("vue-demi").PropType<number>;
        required: true;
        default: number;
    };
    content: {
        type: import("vue-demi").PropType<string>;
        required: true;
    };
    renderHtml: {
        type: import("vue-demi").PropType<boolean>;
        required: true;
        default: boolean;
    };
}>> & {
    "onUpdate:content"?: ((str: string) => any) | undefined;
    onFocus?: ((isFoucs: boolean) => any) | undefined;
}, {
    canEdit: boolean;
    limit: number;
    renderHtml: boolean;
}, {}>;
export default _default;
