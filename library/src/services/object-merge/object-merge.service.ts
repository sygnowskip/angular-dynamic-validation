import { Injectable } from "@angular/core";

@Injectable()
export class ObjectMergeService {
  public deepMerge(jsonRules: any, customRules: any) {
    const isObject = (item: any) => (item && typeof item === 'object' && !Array.isArray(item));

    const output = Object.assign({}, jsonRules);
    if (isObject(jsonRules) && isObject(customRules)) {
      Object.keys(customRules).forEach(key => {
        if (isObject(customRules[key])) {
          if (!(key in jsonRules)) {
            Object.assign(output, { [key]: customRules[key] });
          } else {
            output[key] = this.deepMerge(jsonRules[key], customRules[key]);
          }
        } else {
          Object.assign(output, { [key]: customRules[key] });
        }
      });
    }
    return output;
  }

}
