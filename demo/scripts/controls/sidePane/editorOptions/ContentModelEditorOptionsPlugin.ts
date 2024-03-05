import BuildInPluginState, { BuildInPluginProps, UrlPlaceholder } from '../../BuildInPluginState';
import ContentModelOptionsPane from './ContentModelOptionsPane';
import getDefaultContentEditFeatureSettings from './getDefaultContentEditFeatureSettings';
import SidePanePluginImpl from '../SidePanePluginImpl';
import { SidePaneElementProps } from '../SidePaneElement';

const listFeatures = {
    autoBullet: false,
    indentWhenTab: false,
    outdentWhenShiftTab: false,
    outdentWhenBackspaceOnEmptyFirstLine: false,
    outdentWhenEnterOnEmptyLine: false,
    mergeInNewLineWhenBackspaceOnFirstChar: false,
    maintainListChain: false,
    maintainListChainWhenDelete: false,
    autoNumberingList: false,
    autoBulletList: false,
    mergeListOnBackspaceAfterList: false,
    outdentWhenAltShiftLeft: false,
    indentWhenAltShiftRight: false,
};

const quoteFeatures = {
    unquoteWhenBackspaceOnEmptyFirstLine: false,
    unquoteWhenEnterOnEmptyLine: false,
};

const initialState: BuildInPluginState = {
    pluginList: {
        contentEdit: true,
        hyperlink: true,
        paste: false,
        watermark: false,
        imageEdit: true,
        cutPasteListChain: false,
        tableCellSelection: true,
        customReplace: true,
        listEditMenu: true,
        imageEditMenu: true,
        tableEditMenu: true,
        contextMenu: true,
        autoFormat: true,
        announce: true,
    },
    contentEditFeatures: {
        ...getDefaultContentEditFeatureSettings(),
        ...listFeatures,
        ...quoteFeatures,
    },
    defaultFormat: {},
    linkTitle: 'Ctrl+Click to follow the link:' + UrlPlaceholder,
    watermarkText: 'Type content here ...',
    forcePreserveRatio: false,
    applyChangesOnMouseUp: false,
    experimentalFeatures: [],
    isRtl: false,
    cacheModel: true,
    tableFeaturesContainerSelector: '#' + 'EditorContainer',
};

export default class ContentModelEditorOptionsPlugin extends SidePanePluginImpl<
    ContentModelOptionsPane,
    BuildInPluginProps
> {
    constructor() {
        super(ContentModelOptionsPane, 'options', 'Editor Options');
    }

    getBuildInPluginState(): BuildInPluginState {
        let result: BuildInPluginState;
        this.getComponent(component => (result = component.getState()));
        return result || initialState;
    }

    getComponentProps(base: SidePaneElementProps) {
        return {
            ...initialState,
            ...base,
        };
    }
}
