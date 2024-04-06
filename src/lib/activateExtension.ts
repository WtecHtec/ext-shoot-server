import {runAppleScript} from "run-applescript";
async function activateExtension(extName: string) : Promise<boolean> {
    const script = `
    on ActivateExtension(extName)
        try
            tell application "Arc" to activate
            delay 0.2

            tell application "System Events" to tell process "Arc"
                set extMenu to menu "Extensions" of menu bar item "Extensions" of menu bar 1
                if extMenu exists then
                    set extMenuItem to (menu items of extMenu where the name is extName)
                    if extMenuItem is not {} then
                        click first item of extMenuItem
                    end if
                end if
            end tell
        on error errMsg
            -- An error occurred, handle it appropriately
        end try
    end ActivateExtension

    ActivateExtension("${extName}")
  `;

    try {
        await runAppleScript(script);
        console.log(`${extName} extension activated.`);
        return true;
    } catch (error) {
        console.error(`Failed to activate ${extName} extension:`, error);
        return false;
    }
}


export {
    activateExtension
};