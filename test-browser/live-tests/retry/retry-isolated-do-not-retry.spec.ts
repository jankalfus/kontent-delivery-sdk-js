import { retryService } from '@kentico/kontent-core';

import { Context, setup } from '../../setup';

describe('Retry - isolated - do not retry', () => {
    const retryAttempts = 3;
    const MAX_SAFE_TIMEOUT = Math.pow(2, 31) - 1;

    jasmine.DEFAULT_TIMEOUT_INTERVAL = MAX_SAFE_TIMEOUT;

    beforeAll(done => {
        spyOn(retryService, 'debugLogAttempt').and.callThrough();

        const context = new Context();
        context.retryStrategy = {
            addJitter: false,
            deltaBackoffMs: 1000,
            maxCumulativeWaitTimeMs: 5000,
            useRetryForResponseCodes: []
        };

        setup(context);
        const client = context.deliveryClient;

        const observable = client
            .items()
            .withUrl('fakeUrl')
            .toObservable();

        observable.subscribe(
            response => {
                done();
            },
            error => {
                done();
            }
        );
    });

    it(`Warning for retry attempt should have been called '${retryAttempts}' times`, () => {
        expect(retryService.debugLogAttempt).toHaveBeenCalledTimes(0);
    });
});
