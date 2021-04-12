import React, { MouseEventHandler, ComponentType } from 'react';
export interface DragSortProps {
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
}
export interface TypeMouseDown {
    hasDragSortMouseDown?: boolean;
}
export interface DragSortMouseDownProps {
    onMouseDown: (e: React.MouseEvent) => void;
}