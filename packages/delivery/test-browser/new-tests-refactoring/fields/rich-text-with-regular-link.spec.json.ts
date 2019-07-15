import { ContentItem, Fields, getParserAdapter, ILinkResolverResult, richTextResolver } from '../../../lib';

describe('Rich text with regular link', () => {
    const linkedItems: ContentItem[] = [];
    const getLinkedItem: (codename: string) => ContentItem | undefined = (codename) => linkedItems.find(m => m.system.codename === codename);

    const html = `Text with <a href="domain.com">link</a>`;

    it(`Resolving HTML should succeed`, () => {
        const fieldWithoutRichTextResolver = new Fields.RichTextField({
            rawField: {
                name: 'name',
                taxonomy_group: undefined,
                type: 'x',
                value: html
            },
            contentTypeSystem: {} as any,
            propertyName: 'name'
        }, linkedItems.map(m => m.system.codename), {
                links: [],
                resolveHtmlFunc: () => richTextResolver.resolveHtml('', html, 'name', {
                    enableAdvancedLogging: false,
                    links: [],
                    getLinkedItem: getLinkedItem,
                    images: [],
                    richTextHtmlParser: getParserAdapter(),
                    linkedItemWrapperClasses: ['kc-wrapper-class'],
                    linkedItemWrapperTag: 'kc-item-wrapper',
                    queryConfig: {
                        richTextResolver: undefined as any,
                        linkResolver: (link) => <ILinkResolverResult>{
                            asHtml: `<test>${link.urlSlug}</test>`,
                        }
                    },
                }),
                images: []
            });

        const expectedHtml = `Text with <a href="domain.com">link</a>`;
        expect(fieldWithoutRichTextResolver.resolveHtml()).toContain(expectedHtml);
    });
});

