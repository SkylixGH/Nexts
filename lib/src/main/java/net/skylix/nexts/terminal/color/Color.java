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

    /**
     * Apply the color properties to the text
     * @param text The text to apply the color properties to
     * @return The modified text
     */
    public String apply(String text) {
        String boldChar = settings.bold ? "\u001b[1m" : "";
        String underlineChar = settings.underline ? "\u001b[4m" : "";
        String colorChar = settings.color != ColorNames.NONE ? "\u001b[" + getANSIColorCode(settings.color, settings.intense) + "m" : "";
        String backgroundColorChar = settings.backgroundColor != ColorNames.NONE ? "\u001b[" + getANSIBackgroundColorCode(settings.backgroundColor, settings.backgroundIntense) + "m" : "";

        return backgroundColorChar + colorChar + boldChar + underlineChar + text + "\u001b[0m";
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
     * Get the ANSI color code number for coloring a background
     * @param color The color name
     * @return The color code
     */
    public static Integer getANSIBackgroundColorCode(ColorNames color) {
        return getANSIColorCode(color) + 10;
    }

    /**
     * Update the color parsing settings
     * @param settings The new settings
     */
    public void updateSettings(ColorSettings settings) {
        this.settings = settings;
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

    /**
     * Get the ANSI color code number for coloring a background
     * @param color The color name
     * @param intense Whether the color should be intense
     * @return The color code for the background
     */
    public static Integer getANSIBackgroundColorCode(ColorNames color, boolean intense) {
        return getANSIBackgroundColorCode(color) + (intense ? 60 : 0);
    }
}
