import { Injectable } from '@angular/core';
import {
  CapacitorBarcodeScanner,
  CapacitorBarcodeScannerOptions,
} from '@capacitor/barcode-scanner';
@Injectable({
  providedIn: 'root',
})
export class BarCodeService {
  async scanCode() {
    try {
      let options: CapacitorBarcodeScannerOptions = {
        hint: 17,
        web: {
          showCameraSelection: true,
        },
        scanButton: true,
      };
      let result = await CapacitorBarcodeScanner.scanBarcode(options);
      // console.log(result, 16)

      return result.ScanResult;
    } catch (err) {
      console.log(err);
      throw `${err}`;
    }
  }
}
