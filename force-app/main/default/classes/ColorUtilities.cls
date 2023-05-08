public with sharing class ColorUtilities {

    static String[] hexMap = '0123456789ABCDEF'.split('');

    public static String decToHex(Integer x) {
        if (x == 0) return '00';

        String result = '';

        while (x != 0) {
            Integer modulus = Math.mod(x, 16);
            result = hexMap[modulus] + result;          
            x /= 16;
        }

        return result.length() == 1 ? '0' + result : result;
    } 

    public static String rgbToHex(Integer r, Integer g, Integer b) {
        return '#' + decToHex(r) + decToHex(g) + decToHex(b);
    }

}