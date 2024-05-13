import { Column, ColumnOptions, ColumnType } from 'typeorm'

import { ColumnEmbeddedOptions } from 'typeorm/decorator/options/ColumnEmbeddedOptions'
import { ValueTransformer } from 'typeorm/decorator/options/ValueTransformer'

// Custom decorator to automatically set column type to 'timestamptz' and the transformer to our UTCDateTransformer
export function FHIRDateColumn(
  typeOrOptions?:
    | ((type?: any) => Function)
    | ColumnType
    | (ColumnOptions & ColumnEmbeddedOptions),
  options?: ColumnOptions & ColumnEmbeddedOptions
): Function {
  return function (object: Object, propertyName: string) {
    // normalize parameters
    let type: ColumnType | undefined
    if (
      typeof typeOrOptions === 'string' ||
      typeOrOptions instanceof Function
    ) {
      type = <ColumnType>typeOrOptions || 'timestamptz'
    } else if (typeOrOptions) {
      options = <ColumnOptions>typeOrOptions
      type = typeOrOptions.type || 'timestamptz'
    }
    if (!options) options = {} as ColumnOptions
    options.transformer = UTCDateTransformer

    return Column(<any>type, options)(object, propertyName)
  }
}

// Transformer used to make sure that everything stays happy.
export const UTCDateTransformer: ValueTransformer = {
  to(value: any): any {
    // I remove the Z because this is what causes DateUtils.mixedDateToDate to recognize that it's UTC and convert it to local time
    // by doing this, it assumes that the date MUST be in our local time, this can have some side effects if mistakenly used.
    //return (typeof value !== 'string' ? (<Date>value).toISOString() : value).replace('Z', '');

    const YYYY = new RegExp('^[0-9]{4}$')

    if (typeof value === 'string') {
      if (YYYY.test(value)) {
        //return value + '-05-05'
        const DTobj = new Date(value)
        console.log('The Date is ', DTobj.toISOString())
        return DTobj.toISOString().replace('Z', '')
        //return '05-05-' + value + " 00:00:00 CDT"
        //return new Date(value)
      }
    }

    return value
  },
  from(value: any): any {
    // This is just a sanity thing, it should be coming back from the database as a date object, but just to be safe,
    // this could probably be better, but i haven't run into issues with it yet.
    //return (typeof value === 'string' ? new Date(value.indexOf('Z') !== -1 ? value : value + 'Z') : value);
    return value
  }
}
