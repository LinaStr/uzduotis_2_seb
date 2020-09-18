package com.company.seb_uzduotis_2;

import com.company.seb_uzduotis_2.lbEntities.LBExchangeRates;
import org.springframework.stereotype.Service;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamReader;
import javax.xml.transform.stream.StreamSource;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class XmlManager {
    private String tp = "eu";
    private String ccy = "";
    private String dtFrom = "2015-01-01";
    private String dtTo = new SimpleDateFormat("yyyy-MM-dd").format(new Date());;

    public StringBuffer getXmlRequestFromLB(){
        StringBuffer response = new StringBuffer();
        try {
            String url = "https://www.lb.lt/webservices/fxrates/fxrates.asmx";
            URL obj = new URL(url);
            HttpURLConnection connection = (HttpURLConnection) obj.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/soap+xml; charset=utf-8");

            String xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
                    "<soap12:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap12=\"http://www.w3.org/2003/05/soap-envelope\">\n" +
                    "  <soap12:Body>\n" +
                    "    <getFxRatesForCurrency xmlns=\"http://www.lb.lt/WebServices/FxRates\">\n" +
                    "      <tp>"+tp+"</tp>\n" +
                    "      <ccy>"+ccy+"</ccy>\n" +
                    "      <dtFrom>"+dtFrom+"</dtFrom>\n" +
                    "      <dtTo>"+dtTo+"</dtTo>\n" +
                    "    </getFxRatesForCurrency>\n" +
                    "  </soap12:Body>\n" +
                    "</soap12:Envelope>";
            connection.setDoOutput(true);
            DataOutputStream wr = new DataOutputStream(connection.getOutputStream());
            wr.writeBytes(xml);
            wr.flush();
            wr.close();
            String responseStatus = connection.getResponseMessage();
            System.out.println("Lb response satus: "+responseStatus);
            BufferedReader in = new BufferedReader(new InputStreamReader(
                    connection.getInputStream()));
            String inputLine;

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();
//            System.out.println("LB response:" + response.toString());

        } catch (Exception e) {
            System.out.println(e);
        }
        return response;
    }

    public static LBExchangeRates getXmlAsLbExchangeRatesObject(StringBuffer response) throws JAXBException, XMLStreamException {
        XMLInputFactory xif = XMLInputFactory.newFactory();
        StreamSource xml = new StreamSource(new StringReader(response.toString()));
        XMLStreamReader xsr = xif.createXMLStreamReader(xml);
        xsr.nextTag();
        while (!xsr.getLocalName().equals("FxRates")) {
            xsr.nextTag();
        }

        JAXBContext context = JAXBContext.newInstance(LBExchangeRates.class);
        Unmarshaller un = context.createUnmarshaller();
        LBExchangeRates exchangeRates = (LBExchangeRates) un.unmarshal(xsr);
        xsr.close();

        return exchangeRates;
    }
}
