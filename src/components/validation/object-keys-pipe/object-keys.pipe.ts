import { PipeTransform, Pipe } from "@angular/core";

@Pipe({ name: "keys" })
export class ObjectKeysPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    const keys = new Array<string>();
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    return keys;
  }
}
