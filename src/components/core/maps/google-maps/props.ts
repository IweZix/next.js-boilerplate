export interface GoogleMapsProps {
  /**
   * The address to display on the Google Map.
   * @example "La Villa Loraine, Belgique"
   * @example "164 Chaussée de Bruxelles, 1410 Waterloo, Belgique"
   */
  address: string;
  width?: string | number;
  height?: string | number;
}
