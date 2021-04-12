import { Plugin } from "@/types";

export interface InfoModalProps {
    plugin: Plugin;
    visiable: boolean;
    close(): void;
}