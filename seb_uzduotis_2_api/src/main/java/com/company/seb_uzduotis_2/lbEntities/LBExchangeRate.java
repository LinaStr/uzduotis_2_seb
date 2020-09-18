package com.company.seb_uzduotis_2.lbEntities;


import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@XmlRootElement(name = "FxRate")
@XmlAccessorType(XmlAccessType.FIELD)

public class LBExchangeRate implements Serializable {


    @XmlElement(name="Dt")
    private String date;


    @XmlElement(name="CcyAmt")
    public List<LBCcyAmt> ccyAmts;

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public List<LBCcyAmt> getCcyAmts() {
        return ccyAmts;
    }

    public void setCcyAmts(List<LBCcyAmt> ccyAmts) {
        this.ccyAmts = ccyAmts;
    }
}
