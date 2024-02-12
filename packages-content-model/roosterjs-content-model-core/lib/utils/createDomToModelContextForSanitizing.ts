import { containerSizeFormatParser } from '../override/containerSizeFormatParser';
import { createDomToModelContext } from 'roosterjs-content-model-dom';
import { createPasteEntityProcessor } from '../override/pasteEntityProcessor';
import { createPasteGeneralProcessor } from '../override/pasteGeneralProcessor';
import { pasteDisplayFormatParser } from '../override/pasteDisplayFormatParser';
import { pasteTextProcessor } from '../override/pasteTextProcessor';
import type {
    ContentModelSegmentFormat,
    DomToModelContext,
    DomToModelOption,
    DomToModelOptionForSanitizing,
} from 'roosterjs-content-model-types';

const DefaultSanitizingOption: DomToModelOptionForSanitizing = {
    processorOverride: {},
    formatParserOverride: {},
    additionalFormatParsers: {},
    additionalAllowedTags: [],
    additionalDisallowedTags: [],
    styleSanitizers: {},
    attributeSanitizers: {},
};

/**
 * @internal
 */
export function createDomToModelContextForSanitizing(
    defaultFormat?: ContentModelSegmentFormat,
    defaultOption?: DomToModelOption,
    additionalSanitizingOption?: DomToModelOptionForSanitizing
): DomToModelContext {
    const sanitizingOption: DomToModelOptionForSanitizing = {
        ...DefaultSanitizingOption,
        ...additionalSanitizingOption,
    };

    return createDomToModelContext(
        {
            defaultFormat,
        },
        defaultOption,
        {
            processorOverride: {
                '#text': pasteTextProcessor,
                entity: createPasteEntityProcessor(sanitizingOption),
                '*': createPasteGeneralProcessor(sanitizingOption),
            },
            formatParserOverride: {
                display: pasteDisplayFormatParser,
            },
            additionalFormatParsers: {
                container: [containerSizeFormatParser],
            },
        },
        sanitizingOption
    );
}
