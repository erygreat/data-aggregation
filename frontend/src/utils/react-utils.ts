import React from "react";

export default {
    isDomTypeElement: (element: React.ReactElement) => {
        return React.isValidElement(element) && typeof element.type === "string";
    },
    isReactComponent: (element: React.ReactElement | string) => {
        return React.isValidElement(element) && typeof element.type === 'function';
    },
    isFunctionComponent: (element: React.ReactElement) => {
        return typeof element.type === 'function' && String(element).includes('return React.createElement');
    },
    isClassComponent: (element: React.ReactElement) => {
        return typeof element.type === 'function' && !!element.type.prototype.isReactComponent;
    },
}