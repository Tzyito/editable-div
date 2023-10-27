import { PropType } from "vue-demi";
type ComponentsType = "input" | "textarea";
export declare const dynamicProps: {
    /** allow edit the element */
    canEdit: {
        type: PropType<boolean>;
        default: boolean;
    };
    /** allow limit max char number */
    limit: {
        type: PropType<number>;
        default: number;
    };
    /** the element content (v-model) */
    content: {
        type: PropType<string>;
        required: boolean;
    };
    /** render html into the element */
    renderHtml: {
        type: PropType<boolean>;
        default: boolean;
    };
    /** set the element row number (eg: like textarea row attributes*/
    row: {
        type: PropType<number>;
        default: number;
    };
    /** set the element type: input or textarea (eg: default */
    type: {
        type: PropType<ComponentsType>;
        default: string;
    };
    /** when set the element as textarea, it will decide autogrow container box height */
    autogrow: {
        type: PropType<boolean>;
        default: boolean;
    };
    /** inject class */
    wrapperClass: {
        type: PropType<string>;
        default: string;
        required: boolean;
    };
};
export {};
