import browser from './browser'

export const hotkeys = {
    async getAll() {        
        try{
            const commands = await browser.commands.getAll()
            if (Array.isArray(commands) && commands.length)
                return commands
        } catch(e){
            console.log(e)
        }

        //fallback, get commands from manifest file
        //useful for safari, for some reason browser.commands.getAll doesn't work
        try{
            const { commands={} } = await browser.runtime.getManifest()
            const { os } = await browser.runtime.getPlatformInfo()

            return Object.entries(commands)
                .map(([name, { suggested_key, description }])=>({
                    name,
                    description,
                    shortcut: suggested_key && suggested_key[os] ? suggested_key[os] : ''
                }))
                .filter(({ shortcut })=>shortcut)
        } catch(e) {}
        
        return [] 
    },

    link() {
        switch(process.env.EXTENSION_VENDOR) {
            case 'firefox':
                return 'https://support.mozilla.org/en-US/kb/manage-extension-shortcuts-firefox'

            case 'chrome':
            case 'opera':
                return 'chrome://extensions/shortcuts'
        }

        return undefined
    }
}