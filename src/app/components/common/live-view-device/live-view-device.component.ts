import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { components, pipelines } from 'media-stream-library';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, } from '@angular/common/http';
import { Device } from '../../../backend';

@Component({
  selector: 'app-live-view-device',
  templateUrl: './live-view-device.component.html',
  styleUrls: ['./live-view-device.component.css']
})
export class LiveViewDeviceComponent implements OnInit {

  @ViewChild('videoElement') videoElement: ElementRef;
  @Input() device: Device;

  public showVideo: boolean;

  constructor(private http: HttpClient) { }

  async ngOnInit() {
    this.showVideo = false;
    const v = this.videoElement.nativeElement;
    console.log('live-view host: ', this.device.address);
    console.log('videoElement: ', v);

    // let h = new HttpHeaders();
    // h = h.append('Authorization', 'Basic ' + btoa('root:pass1'));
    // h = h.append('Access-Control-Allow-Origin', '*');

    this.showVideo = await this.authorize(this.device.address);
    console.log('error: ', this.showVideo);
    if (this.showVideo) {
      console.log('authenticated');
      const pipeline = new pipelines.Html5VideoPipeline({
        ws: { uri: `ws://${this.device.address}/rtsp-over-websocket` },
        rtsp: { uri: `rtsp://${this.device.address}/axis-media/media.amp` },
        videoEl: v,
      });
      await pipeline.ready;
      pipeline.play();
    }

    // this.http.get(`http://${this.device.address}/axis-cgi/usergroup.cgi`, { headers: h }).subscribe(async (res) => {
    //   console.log('authenticated');
    //   const pipeline = new pipelines.Html5VideoPipeline({
    //     ws: { uri: `ws://${this.device.address}/rtsp-over-websocket` },
    //     rtsp: { uri: `rtsp://${this.device.address}/axis-media/media.amp` },
    //     v,
    //   });
    //   await pipeline.ready;
    //   pipeline.play();
    // }, (err) => {
    //   console.error('streaming authentication err: ', err);
    // });
  }

  async authorize(host) {
    // Force a login by fetching usergroup
    const fetchOptions = {
      credentials: 'include',
      headers: {
        'Axis-Orig-Sw': true,
        'X-Requested-With': 'XMLHttpRequest'
      },
      mode: 'no-cors'
    };
    try {
      await window.fetch(`http://${host}/axis-cgi/usergroup.cgi`, fetchOptions)
      return true;
    } catch (err) {
      console.error('auth failed', err);
      return false;
    }
  }
}
