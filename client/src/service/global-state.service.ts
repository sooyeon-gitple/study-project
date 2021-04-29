import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as _ from 'lodash';
interface State {
  id: number;
  callback: Function;
}
@Injectable()
export class GlobalState {
  private _handleId: number = 1;
  private _data = new Subject<Object>();
  private _dataStream$ = this._data.asObservable();
  private _subscriptions: Map<string, Array<State>> = new Map<
    string,
    Array<State>
  >();
  constructor() {
    this._dataStream$.subscribe((data) => this._onEvent(data));
  }
  notify(event, value) {
    this._data.next({
      event: event,
      data: value,
    });
  }
  //데이터가 변경되었을때만 notify
  notifyDataChanged(event, value) {
    let current = this._data[event];
    if (current !== value) {
      this._data[event] = value;
      this._data.next({
        event: event,
        data: value,
      });
    }
  }
  subscribe(event: string, callback: Function): number {
    let state: State = {
      id: this._handleId++,
      callback: callback,
    };
    let subscribers = this._subscriptions.get(event) || [];
    subscribers.push(state);
    this._subscriptions.set(event, subscribers);
    return state.id;
  }
  //sub 하는 순간 이전 상태 return (없을 경우 return null)
  subscribeBehavior(event: string, callback: Function): number {
    let stateId: number = this.subscribe(event, callback);
    if (!_.isUndefined(this._data[event]) && callback) {
      // emit with latest data if exists
      callback(this._data[event]);
    }
    return stateId;
  }
  unsubscribe(event: string, suber: number) {
    let subscribers = this._subscriptions.get(event);
    let removed: State[] = _.remove(subscribers, (state: State) => {
      return suber === state.id;
    });
  }
  _onEvent(data: any) {
    let subscribers = this._subscriptions.get(data['event']) || [];
    subscribers.forEach((state: State) => {
      state.callback.call(null, data['data']);
    });
  }
}
