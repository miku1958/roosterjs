import RibbonButton from '../../../plugins/RibbonPlugin/RibbonButton';

/**
 * "Undo" button on the format ribbon
 */
export const undo: RibbonButton = {
    key: 'undo',
    unlocalizedText: 'undo',
    iconName: 'undo',
    disabled: formatState => !formatState.canUndo,
    onClick: editor => {
        editor.undo();
        return true;
    },
};