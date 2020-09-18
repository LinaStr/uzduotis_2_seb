package com.company.seb_uzduotis_2.deleted;

import com.company.seb_uzduotis_2.lbEntities.LBExchangeRate;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

@XmlRootElement(name = "FxRates")
@XmlAccessorType(XmlAccessType.FIELD)
public class LBCurrencies {

    @XmlElement(name="FxRate")
    List<LBExchangeRate> fxRates;

    public List<LBExchangeRate> getFxRates() {
        return fxRates;
    }
}
