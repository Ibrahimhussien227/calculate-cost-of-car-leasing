import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./calculator.css";
import LOADING from "../assets/loading.png";
import Input from "./Input";
import { saveNewData } from "../store/actions/calculator.action";
import { Validation } from "./Validation";

const Calculator = () => {
  const [value, setValue] = useState({
    carValue: 1000000,
    carFee: 10,
    period: 1,
    carIntialPayment: "",
    monthPay: "",
    total: "",
  });
  const [loading, setLoading] = useState(false);
  const {
    errors,
    handleValidation,
    disabled,
    setDisabled,
    validTotal,
    validMonthPay,
  } = Validation({
    value,
  });
  const dispatch = useDispatch();

  const handleValueChange = (e) => {
    const { name, value } = e.target;

    if (name === "carValue") {
      return setValue((prev) => {
        return { ...prev, [name]: value.slice(0, 7) };
      });
    }
    return setValue((prev) => {
      return { ...prev, [name]: value.slice(0, 2) };
    });
  };

  // CAR INTIAL PAYMENT
  const carIntialPayment = useCallback(() => {
    return setValue((prev) => {
      return {
        ...prev,
        carIntialPayment: Math.round(value.carValue * (value.carFee / 100)),
      };
    });
  }, [value.carValue, value.carFee]);

  // MONTH PAYMENT
  const monthPay = useCallback(() => {
    // InteresetRate
    const interesetRate = 0.035;
    return setValue((prev) => {
      return {
        ...prev,
        monthPay: Math.round(
          (value.carValue - value.carIntialPayment) *
            ((interesetRate * Math.pow(1 + interesetRate, value.period)) /
              (Math.pow(1 + interesetRate, value.period) - 1))
        ),
      };
    });
  }, [value.carValue, value.carIntialPayment, value.period]);

  // TOTAL
  const total = useCallback(() => {
    return setValue((prev) => {
      return {
        ...prev,
        total: value.carIntialPayment + value.period * value.monthPay,
      };
    });
  }, [value.carIntialPayment, value.period, value.monthPay]);

  useEffect(() => {
    carIntialPayment();
    monthPay();
    total();
    handleValidation();
  }, [carIntialPayment, monthPay, total, handleValidation]);

  // BUTTON ON CLICK TO CHANGE THE COLOR
  const onButtonClick = (e) => {
    e.target.style.background = "#575757";
    setTimeout(() => {
      e.target.style.background = "";
      setDisabled(true);
    }, 500);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      if (handleValidation) {
        setLoading(true);
        dispatch(saveNewData(value));
        setTimeout(() => {
          setLoading(false);
          setDisabled(false);
        }, 2000);
        setValue({
          carValue: 1000000,
          carFee: 10,
          period: 1,
          carIntialPayment: "",
          monthPay: "",
          total: "",
        });
      }
    } catch {
      setDisabled(true);
      setLoading(false);
      alert("Form has errors.");
    }
  };

  return (
    <div className="container">
      {" "}
      <h1>
        Рассчитайте стоимость
        <br /> автомобиля в лизинг
      </h1>
      <div className="calculator__container">
        <form onSubmit={onSubmit}>
          <Input
            label={"Стоимость автомобиля"}
            name="carValue"
            value={value.carValue}
            handleValueChange={handleValueChange}
            icon={"₽"}
            min={1000000}
            max={6000000}
            error={errors?.carValue}
          />
          <label>
            <h5>Первоначальный взнос</h5>
            <div className="calculator__content">
              <h2>{value.carIntialPayment}</h2>
              <h2>
                {" "}
                ₽
                <input
                  className="calculator__content-input"
                  type="number"
                  name="carFee"
                  value={value.carFee}
                  onChange={handleValueChange}
                  required
                />
                %
              </h2>
            </div>
            <input
              className="slider"
              type="range"
              name="carFee"
              min={10}
              max={60}
              value={value.carFee}
              onChange={handleValueChange}
            />
            <br />
            <span>{errors?.carFee}</span>
          </label>

          <Input
            label={"Срок лизинга"}
            name="period"
            value={value.period}
            handleValueChange={handleValueChange}
            icon={"мес."}
            min={1}
            max={60}
            error={errors?.period}
          />
          {/* CAR PERIOD */}
          <div>
            {" "}
            <h5>Сумма договора лизинга</h5>
            <h1>{validTotal}₽</h1>
          </div>
          <div>
            <h5>Ежемесячный платеж от</h5>
            <h1>{validMonthPay}₽</h1>
          </div>
          <button
            disabled={disabled}
            onClick={onButtonClick}
            type="submut"
            className="btn btn-primary"
          >
            {loading ? <img src={LOADING} alt="loading" /> : "Оставить заявку"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Calculator;
