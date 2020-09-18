package com.company.seb_uzduotis_2.lbEntities;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.math.BigDecimal;

@XmlRootElement(name = "CcyAmt")
@XmlAccessorType(XmlAccessType.FIELD)

public class LBCcyAmt {

    @XmlElement(name="Ccy")
    private String currency;

    @XmlElement(name="Amt")
    private BigDecimal rate;

    public String getCurrency() {
        return currency;
    }

    public BigDecimal getRate() {
        return rate;
    }
}
