import validator from 'validator';

class FormValidation {
  constructor(validationRules) {
    this.validationRules = validationRules;
  }

  validate(formInputValue) {
    let validation = this.validationRuleFieldTypes();

    this.validationRules.forEach((validationRule) => {
      //if the isInvalid false, run and check validation using validator library
      if (!validation[validationRule.field].isInvalid) {
        const userInputToStr = formInputValue[validationRule.field].toString();
        const args = validationRule.args || [];
        const validationMethod =
          typeof validationRule.method === 'string'
            ? validator[validationRule.method]
            : validationRule.method;

        if (
          validationMethod(userInputToStr, ...args, formInputValue) !==
          validationRule.validWhen
        ) {
          validation[validationRule.field] = {
            isInvalid: true,
            message: validationRule.message,
          };
          validation.isValid = false;
        }
      }
    });

    return validation;
  }

  //Return each field type (ex: email, password , phone & etc) and set each field type isInvalid to false . We will use this Generic Field Type to run methods like isEmpty, isNumber passed by Form components.
  validationRuleFieldTypes() {
    const ruleFieldTypes = {};
    this.validationRules.forEach(
      (validationRule) =>
        (ruleFieldTypes[validationRule.field] = {
          isInvalid: false,
          message: '',
        })
    );

    return { isValid: true, ...ruleFieldTypes };
  }
}

export default FormValidation;
