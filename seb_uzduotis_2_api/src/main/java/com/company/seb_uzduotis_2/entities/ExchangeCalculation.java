package com.company.seb_uzduotis_2.entities;

import java.math.BigDecimal;

public class ExchangeCalculation {
    String ccyFrom;
    String ccyTo;
    BigDecimal rateFrom;
    BigDecimal rateTo;
    BigDecimal calculatedAmount;

    public ExchangeCalculation() {
    }

    public String getCcyFrom() {
        return ccyFrom;
    }

    public void setCcyFrom(String ccyFrom) {
        this.ccyFrom = ccyFrom;
    }

    public String getCcyTo() {
        return ccyTo;
    }

    public void setCcyTo(String ccyTo) {
        this.ccyTo = ccyTo;
    }

    public BigDecimal getRateFrom() {
        return rateFrom;
    }

    public void setRateFrom(BigDecimal rateFrom) {
        this.rateFrom = rateFrom;
    }

    public BigDecimal getRateTo() {
        return rateTo;
    }

    public void setRateTo(BigDecimal rateTo) {
        this.rateTo = rateTo;
    }

    public BigDecimal getCalculatedAmount() {
        return calculatedAmount;
    }

    public void setCalculatedAmount(BigDecimal calculatedAmount) {
        this.calculatedAmount = calculatedAmount;
    }
}
