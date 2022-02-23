# Class: `Color`

This is the color utility for Java CLI.

# Constructor
 - Parameters
   - `settings` ([`ColorSettings`](./ColorSettings.md)) The color modification settings.

# Public Method: `apply`

Apply the current color modifications to some text.

 - Static: `false`.
 - Return: `String` The text with the color modifications applied.
 - Parameters
   - `text` (`String`) The text to apply the color modifications to.

# Public Method `getANSIColorCode`

Get the ansi color code number for text for use in the Java CLI.

 - Static: `true`.
 - Return `Integer` The color code for use on text as a number with ANSI.
 - Parameters
   - `color` ([`ColorNames`](./ColorNames.md)) The color's name.

# Public Method `getANSIColorCode`

Get the ansi color code number for text for use in the Java CLI.

 - Static: `true`.
 - Return `Integer` The color code for use on text as a number with ANSI.
 - Parameters
   - `color` ([`ColorNames`](./ColorNames.md)) The name of the color.
   - `intense` (`boolean`) Whether the color is intense or not.

# Public Method `getANSIBackgroundColorCode`

Get the text background color index for use in ANSI text colorization.

 - Static: `true`.
 - Return `Integer`.
 - Parameters
   - `color` ([`ColorNames`](./ColorNames.md)) The name of the color.

# Public Method `getANSIBackgroundColorCode`

Get the text background color index for use in ANSI text colorization.

 - Static: `true`.
 - Return `Integer`.
 - Parameters
   - `color` ([`ColorNames`](./ColorNames.md)) The name of the color.
   - `intense` (`boolean`) Whether the color is intense or not.

# Public Method `updateSettings`

Update the color settings.

 - Static: `false`.
 - Return `void`.
 - Parameters
   - `settings` ([`ColorSettings`](./ColorSettings.md)) The new color settings.
