
async function activateExtension(extName) {
    let runAppleScript;
    try {
        const appleScriptModule = await import('run-applescript');
        runAppleScript = appleScriptModule.default || appleScriptModule.runAppleScript;
    } catch (error) {
        console.error('Failed to import run-applescript module:', error);
        return false;
    }

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
async function getBrowserInfo() {
    const script = `
    on GetBrowserInfo()
        try
            tell application "System Events" to tell process "Arc"
                set browserName to name of front window
                set browserURL to value of attribute "AXURL" of front window
                set browserTitle to value of attribute "AXTitle" of front window
                set browserPosition to position of front window
                set browserSize to size of front window
                set browserInfo to {name:browserName, url:browserURL, title:browserTitle, position:browserPosition, size:browserSize}
            end tell
        on error errMsg
            -- An error occurred, handle it appropriately
        end try
    end GetBrowserInfo

    GetBrowserInfo()
  `;

    try {
        const result = await runAppleScript(script);
        console.log('Browser Info:', result);
        return result;
    } catch (error) {
        console.error('Failed to get browser info:', error);
        return null;
    }
}


module.exports = {
    activateExtension,
    getBrowserInfo
}