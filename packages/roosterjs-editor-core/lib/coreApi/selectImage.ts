import { createRange } from 'roosterjs-editor-dom';
import { EditorCore, SelectImage, SelectionRangeTypes } from 'roosterjs-editor-types';

/**
 * @internal
 * Select a image and save data of the selected range
 * @param core The EditorCore object
 * @param image Image to select
 * @param wrapper Selected image wrapper
 * @returns Selected image information
 */
export const selectImage: SelectImage = (core: EditorCore, image: HTMLImageElement | null) => {
    if (image) {
        const range = createRange(image);

        return {
            type: SelectionRangeTypes.ImageSelection,
            ranges: [range],
            image: image,
            areAllCollapsed: range.collapsed,
        };
    }

    return null;
};
