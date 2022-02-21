/*
 * This Java source file was generated by the Gradle 'init' task.
 */
package nexts;

import net.skylix.nexts.terminal.Renderer;

public class LibraryTest {
    /**
     * This is the main method for the class
     * @param args Arguments that came from the command line interface
     */
    public static void main(String[] args) {
        System.out.println("This is some example usage: " + args.toString());
        Renderer.render(new String[]{"hello", "world"});

        Renderer.moveCursor(-1, -1);
        Renderer.render(new String[] { "Over", "Write" });
    }
}
