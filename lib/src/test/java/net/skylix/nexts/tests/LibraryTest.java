package net.skylix.nexts.tests;

import net.skylix.nexts.terminal.color.Color;
import net.skylix.nexts.terminal.color.ColorChain;
import net.skylix.nexts.terminal.color.ColorNames;
import net.skylix.nexts.terminal.color.ColorSettings;

public class LibraryTest {
    /**
     * This is the main method for the class
     * @param args Arguments that came from the command line interface
     */
    public static void main(String[] args) {
        System.out.println("This is some example usage: " + args.toString());
        String redText = "This text should be " + new ColorChain().bold().cyan().blackBk().apply("RED") + ", Cool Right?";

        System.out.println(redText);
    }
}
