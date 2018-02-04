import { IValidationFields } from '../components/validation/types';

export default <{ [model: string]: { fields: IValidationFields } }>{
  exampleModel: {
    fields: {
      surname: {
        rules: {
          length: {
            min: 0,
            max: 50,
            message: "Max length is 50"
          }
        }
      }
    }
  },
  customModel: {
    fields: {
      bar: {
        rules: {
          required: {
            required: true,
            message: "This foo is bar"
          }
        }
      }
    }
  }
};
