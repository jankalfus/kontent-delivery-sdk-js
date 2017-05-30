// core
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// config
import { DeliveryClientConfig } from '../config/delivery-client.config';

// models
import { ResponseSingle, ResponseMultiple } from '../models/item/responses';
import { IItem } from '../interfaces/item/iitem.interface';
import { IItemQueryOption } from '../interfaces/item/iitem-query-option.interface';

// services
import { ItemMapService } from '../utility-services/item-map.service';
import { DeliveryClientBaseService } from './delivery-client-base.service';

@Injectable()
export class DeliveryClient extends DeliveryClientBaseService {

    constructor(
        protected http: Http,
        protected config: DeliveryClientConfig
    ) {
        super(http, config)
    }

    getItems<TItem extends IItem>(type: string, options?: IItemQueryOption[]): Observable<ResponseMultiple<TItem>> {
        var action = '/items?system.type=' + type;

        return this.getMultipleItems(type, action, options);
    }

    getItemByCodename<TItem extends IItem>(type: string, codename: string, options?: IItemQueryOption[]): Observable<ResponseSingle<TItem>> {
        var action = '/items/' + codename;

        return this.getSingleItem(type, action, options);
    }

    getItemById<TItem extends IItem>(type: string, id: string, options?: IItemQueryOption[]): Observable<ResponseSingle<TItem>> {
        var action = '/items?system.type=' + type + '&system.id=' + id + '&limit=1';

        return this.getSingleItem(type, action, options);
    }
}