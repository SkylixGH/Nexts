package net.skylix.nexts.terminal.color;

/**
 * Java CLI text colorization util
 */
public class Color {
    /**
     * The settings for other properties
     */
    private ColorSettings settings;

    /**
     * Create a CLI text colorization tool
     * @param settings Other settings for the text
     */
    public Color(ColorSettings settings) {
        this.settings = settings;
    }

    public String apply(String text) {
        String boldChar = settings.bold ? "\u001b[1m" : "";
        String underlineChar = settings.underline ? "\u001b[4m" : "";
        String colorChar = settings.color != ColorNames.NONE ? "\u001b[" + getANSIColorCode(settings.color, settings.intense) + "m" : "";

        return boldChar + underlineChar + colorChar + text + "\u001b[0m";
    }

    /**
     * Get the color ID in ANSI for a specific color
     * @param color The color name
     * @return The color code
     */
    public static Integer getANSIColorCode(ColorNames color) {
        int colorCode;

        switch (color) {
            case RED -> colorCode = 1;
            case YELLOW -> colorCode = 3;
            case GREEN -> colorCode = 2;
            case CYAN -> colorCode = 6;
            case BLUE -> colorCode = 4;
            case PURPLE -> colorCode = 5;
            case WHITE -> colorCode = 7;
            default -> colorCode = 0;
        }

        return colorCode + 30;
    }

    /**
     * Get the color ID in ANSI for a specific color
     * @param color The color name
     * @param intense Whether the color is in high intensity
     * @return The color code
     */
    public static Integer getANSIColorCode(ColorNames color, boolean intense) {
        return getANSIColorCode(color) + (intense ? 60 : 0);
    }
}
