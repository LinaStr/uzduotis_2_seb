package com.company.seb_uzduotis_2.lbEntities;//package com.company.uzduotis_2.LBentities;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.List;

@XmlRootElement(name = "FxRates")
@XmlAccessorType(XmlAccessType.FIELD)
public class LBExchangeRates implements Serializable {

    @XmlElement(name="FxRate")
    List<LBExchangeRate> fxRates;

    public List<LBExchangeRate> getFxRates() {
        return fxRates;
    }

}
