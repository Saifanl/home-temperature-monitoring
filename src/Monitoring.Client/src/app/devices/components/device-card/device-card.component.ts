import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Logger } from '@app/core';
import { DevicesState } from '@app/devices/store/devices.state';
import { Store } from '@ngxs/store';
import * as moment from 'moment';
import { Observable } from 'rxjs';

import { Device, Measurement } from '../../models';

const logger = new Logger('Device');

@Component({
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.scss'],
})
export class DeviceCardComponent implements OnInit, OnDestroy {
  measurement$: Observable<Measurement>;

  @Input()
  device: Device;

  constructor(private store: Store) {}

  ngOnInit() {
    this.measurement$ = this.store.select(DevicesState.measurement(this.device.uuid));
  }

  ngOnDestroy(): void {}

  private isOnline(measurement: Measurement): boolean {
    const utcNow = moment.utc();
    const measurementTimeStamp = moment(measurement.timeStamp).utc();
    const diff = utcNow.diff(measurementTimeStamp, 'minutes');

    return diff > 2;
  }
}
