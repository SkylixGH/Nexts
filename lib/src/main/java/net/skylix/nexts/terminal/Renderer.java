package net.skylix.nexts.terminal;

public class Renderer {
    /**
     * The amount of lines rendered previously, -1 indicates that the counter has been reset
     */
    private static Integer lastRendered = -1;

    /**
     * Render a set of lines as an array, once lines are rendered with this method, they can be overwritten as needed
     * @param lines All the lines that need to be rendered
     */
    public static void render(String[] lines) {
        int currentlyRendered = 0;

        while (currentlyRendered != lines.length) {
            System.out.println(lines[currentlyRendered]);
            currentlyRendered++;
        }

        lastRendered = currentlyRendered;
    }

    /**
     * Write a line out into the standard output
     * @param text The line of text that needs to be printed out
     */
    public static void outLn(String text) {
        System.out.println(text);
        lastRendered = 1;
    }

    public static void clearPane() {
        if (lastRendered == -1) return;
    }

    public static void moveCursor(Integer xPosition, Integer yPosition) {
        System.out.print(
                String.format("%c[%d;%df", 0xB1, yPosition, xPosition)
        );
    }
}
