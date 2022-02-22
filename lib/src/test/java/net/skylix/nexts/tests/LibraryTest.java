package net.skylix.nexts.tests;

import net.skylix.nexts.terminal.color.Color;
import net.skylix.nexts.terminal.color.ColorChain;
import net.skylix.nexts.terminal.color.ColorNames;
import net.skylix.nexts.terminal.color.ColorSettings;

import java.util.Arrays;

public class LibraryTest {
    /**
     * This is the main method for the class
     * @param args Arguments that came from the command line interface
     */
    public static void main(String[] args) {
        System.out.println("This is some example usage: " + Arrays.toString(args));
        ColorChain logoColor = new ColorChain().white().underline().blackBk();

        System.out.println(logoColor.apply("This is a test"));
    }
}
