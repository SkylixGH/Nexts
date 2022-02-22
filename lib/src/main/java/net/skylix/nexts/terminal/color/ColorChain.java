package net.skylix.nexts.terminal.color;

/**
 * An instance of a color chain
 */
public class ColorChain {
    private final ColorSettings settings = new ColorSettings();

    public ColorChain bold(boolean enable) {
        settings.bold = enable;
        return this;
    }

    public ColorChain bold() {
        return bold(true);
    }

    /**
     * Apply the current modifier properties
     * @param text The text to apply the modifiers to
     * @return The modified text
     */
    public String apply(String text) {
        return new Color(settings).apply(text);
    }

    public ColorChain red() {
        settings.color = ColorNames.RED;
        return this;
    }

    public ColorChain yellow() {
        settings.color = ColorNames.YELLOW;
        return this;
    }

    public ColorChain green() {
        settings.color = ColorNames.GREEN;
        return this;
    }

    public ColorChain cyan() {
        settings.color = ColorNames.CYAN;
        return this;
    }

    public ColorChain blue() {
        settings.color = ColorNames.BLUE;
        return this;
    }

    public ColorChain purple() {
        settings.color = ColorNames.PURPLE;
        return this;
    }

    public ColorChain black() {
        settings.color = ColorNames.BLACK;
        return this;
    }

    public ColorChain white() {
        settings.color = ColorNames.WHITE;
        return this;
    }

    public ColorChain resetColor() {
        settings.color = ColorNames.NONE;
        return this;
    }

    public ColorChain redBk() {
        settings.backgroundColor = ColorNames.RED;
        return this;
    }

    public ColorChain yellowBk() {
        settings.backgroundColor = ColorNames.YELLOW;
        return this;
    }

    public ColorChain greenBk() {
        settings.backgroundColor = ColorNames.GREEN;
        return this;
    }

    public ColorChain cyanBk() {
        settings.backgroundColor = ColorNames.CYAN;
        return this;
    }

    public ColorChain blueBk() {
        settings.backgroundColor = ColorNames.BLUE;
        return this;
    }

    public ColorChain purpleBk() {
        settings.backgroundColor = ColorNames.PURPLE;
        return this;
    }

    public ColorChain blackBk() {
        settings.backgroundColor = ColorNames.BLACK;
        return this;
    }

    public ColorChain whiteBk() {
        settings.backgroundColor = ColorNames.WHITE;
        return this;
    }

    public ColorChain resetBkColor() {
        settings.backgroundColor = ColorNames.NONE;
        return this;
    }
}
