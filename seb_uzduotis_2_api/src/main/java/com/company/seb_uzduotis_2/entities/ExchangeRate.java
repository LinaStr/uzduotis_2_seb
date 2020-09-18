package com.company.seb_uzduotis_2.entities;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Data
@Entity
@Table(name = "ExchangeRates")
public class ExchangeRate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exchange_rate_id")
    private Long id;

//    @Temporal(TemporalType.DATE)
    @Column(name = "date")
    private String date;

    @Column(name = "base_currency")
    private String baseCurrency;

    @Column(name = "base_rate")
    private BigDecimal baseRate;

    @Column(name = "currency")
    private String currency;

    @Column(name = "rate")
    private BigDecimal rate;

}
