import { useCallback, useState } from "react";

export const Validation = ({ value }) => {
  const [errors, setErrors] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // REFACTORING NUMBER
  const formatNumber = (number) => {
    const result = number.toLocaleString("en-US").replaceAll(",", " ");
    return result;
  };

  const validTotal =
    !value.total || value.total < 0 ? "" : formatNumber(value.total);

  const validMonthPay =
    !value.monthPay || value.monthPay < 0 || value.monthPay === Infinity
      ? ""
      : formatNumber(value.monthPay);

  const handleValidation = useCallback(() => {
    let errors = {};
    let formIsValid = true;

    // carValue
    if (value.carValue > 6000000 || value.carValue < 1000000) {
      formIsValid = false;
      errors.carValue = "Car Value should be between 1M and 6M";
    }

    // carFee
    if (value.carFee > 60 || value.carFee < 10) {
      formIsValid = false;
      errors.carFee = "Fee should be between 10% and 60%";
    }

    // period
    if (value.period > 60 || value.period < 1) {
      formIsValid = false;
      errors.period = "Period should be between 1 and 60 Monthes";
    }

    setErrors(errors);
    setDisabled(Object.values(errors).length);
    return { formIsValid };
  }, [value.carValue, value.carFee, value.period]);

  return {
    errors,
    handleValidation,
    disabled,
    setDisabled,
    validTotal,
    validMonthPay,
  };
};
