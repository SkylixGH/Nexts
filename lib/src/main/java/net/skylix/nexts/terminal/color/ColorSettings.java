package net.skylix.nexts.terminal.color;

/**
 * Settings for applying a color to a string that can be logged into the CLI
 */
public class ColorSettings {
    /**
     * Whether the text should be bold
     */
    public boolean bold = false;

    /**
     * Whether the text should be underlined
     */
    public boolean underline = false;

    /**
     * Whether the text should have a high intensity color
     */
    public boolean intense = false;

    /**
     * Whether the background color should be intense
     */
    public boolean backgroundIntense = false;

    /**
     * The color for the text
     */
    public ColorNames color = ColorNames.NONE;

    /**
     * The color for the background
     */
    public ColorNames backgroundColor = ColorNames.NONE;
}
