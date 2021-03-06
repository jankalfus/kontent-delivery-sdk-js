const assert = require('assert');
const KontentDelivery = require('../../_commonjs');

const movieCodename = 'warrior';

const deliveryClient = new KontentDelivery.DeliveryClient({
    projectId: 'da5abe9f-fdad-4168-97cd-b3464be2ccb9',
    typeResolvers: [],
});

describe('#Rich text element with images', () => {

    let plot; 
    let item;

    before((done) => {
        deliveryClient.item(movieCodename)
        .queryConfig({
            richTextImageResolver: (image, elementName) => {
              var newUrl = new KontentDelivery.ImageUrlBuilder(image.url)
                .withCustomParam('xParam', 'xValue')
                .getUrl();

              return {
                url: newUrl
              };
            }
          })
        .toObservable()
            .subscribe(response => {
                item = response.item;
                plot = response.item.plot.resolveHtml();
                done();
            });
    });
 
    it('Rich text should contain expected image markup', () => {
        item.plot.images.forEach(image => {
            const newImageUrl = image.url + '?xParam=xValue';
            const imageHtml = getImageSrcHtml(newImageUrl);
            assert.ok(plot.includes(imageHtml));
        });
    });

    function getImageSrcHtml(imageUrl) {
        return `src=\"${imageUrl}"`;
    }

});
