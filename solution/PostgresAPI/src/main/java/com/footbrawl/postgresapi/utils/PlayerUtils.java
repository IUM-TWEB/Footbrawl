package com.footbrawl.postgresapi.utils;

/**
 * Utility class for player-related operations.
 */
public class PlayerUtils {

  /**
   * Calculates the market value from a string representation.
   * <p>
   * This method cleans the input string by removing currency symbols and thousand separators,
   * then converts the cleaned string to a double, and finally casts it to an integer.
   * </p>
   *
   * @param value the string representation of the market value
   * @return the market value as an integer, or -1 if the input is null
   */
  public static int calculateMarketValueUtils(String value) {
    if (value == null) {
      return -1;
    }
    String cleanMarketValue;
    if (value.contains("€")) {
      cleanMarketValue = value.replaceAll("[€.]", "");

      cleanMarketValue = cleanMarketValue.replace(',', '.');
    } else {
      cleanMarketValue = value.replaceAll("[$,]", "");
    }
    double doubleValue = Double.parseDouble(cleanMarketValue);
    return (int) doubleValue;
  }

}
