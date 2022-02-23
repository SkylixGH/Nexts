package net.skylix.nexts.terminal;

import net.skylix.nexts.terminal.color.ColorChain;

import java.util.function.Consumer;
import java.util.function.Supplier;

public class Terminal {
    /**
     * Log a message indicating some information
     * @param text The text to log out
     */
    public static void log(String text) {
        logCustom("Info", text, false);
    }

    public static void error(String text) {
        ColorChain redColor = new ColorChain().red().intense();
        logCustom(redColor.apply("Error"), redColor.apply(text), true);
    }

    public static void warn(String text) {
        ColorChain yellowColor = new ColorChain().yellow().intense();
        logCustom(yellowColor.apply("Warning"), text, false);
    }

    public static void success(String text) {
        ColorChain greenColor = new ColorChain().green().intense();
        logCustom(greenColor.apply("Success"), text, false);
    }

    public static void logCustom(String prefix, String text, boolean errorChannel) {
        ColorChain muteColor = new ColorChain().black().intense();

        Consumer<String> printer = (String printerText) -> {
            if (errorChannel) System.err.println(printerText);
            else System.out.println(printerText);
        };

        Supplier<String> wrapBrackets = () -> muteColor.apply("[") + prefix + muteColor.apply("] ") + text;
        printer.accept(wrapBrackets.get());
    }
}
