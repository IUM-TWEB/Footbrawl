package com.footbrawl.postgresapi.utils;

public class PlayerUtils {

  public static int calculateMarketValueUtils(String value) {
    if (value == null) {
      return -1;
    }
    String cleanMarketValue;
    if (value.contains("€")) {
      // Rimuovi il simbolo dell'euro e il separatore delle migliaia
      cleanMarketValue = value.replaceAll("[€.]", "");

      // Sostituisci il separatore decimale con un punto
      cleanMarketValue = cleanMarketValue.replace(',', '.');
    } else {
      cleanMarketValue = value.replaceAll("[$,]", "");
    }
    // Converte la stringa risultante in un numero intero
    double doubleValue = Double.parseDouble(cleanMarketValue);
    return (int) doubleValue;
  }

}
