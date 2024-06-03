import type { StringMap } from 'roosterjs-editor-types';

// Inheritable CSS properties
// Ref: https://www.w3.org/TR/CSS21/propidx.html
export const INHERITABLE_PROPERTIES = (
    'border-spacing,caption-side,color,' +
    'cursor,direction,empty-cells,font-family,font-size,font-style,font-variant,font-weight,' +
    'font,letter-spacing,line-height,list-style-image,list-style-position,list-style-type,' +
    'list-style,orphans,quotes,text-align,text-indent,text-transform,visibility,white-space,' +
    'widows,word-spacing'
).split(',');

/**
 * Get inheritable CSS style values from the given element
 * @param element The element to get style from
 */
export default function getInheritableStyles(element: HTMLElement | null): StringMap {
    const win = element && element.ownerDocument && element.ownerDocument.defaultView;
    const styles = win && element && win.getComputedStyle(element);
    const result: StringMap = {};
    INHERITABLE_PROPERTIES.forEach(
        name => (result[name] = (styles && styles.getPropertyValue(name)) || '')
    );
    return result;
}
