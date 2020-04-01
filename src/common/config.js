/**
 * color settings for different areas (eg hdr, footer),
 * by primary bootstrap theme (eg 'primary')
 * @type {{}}
 */
const themes = {
    defaultTheme: 'dark',
    light: {
        btn: {
            main: 'light-primary',  // bootstrap theme key
        },
        txt: '#222',  // raw
        bg: 'white',  // raw
        hdr: {
            variant: 'light-primary',  // bootstrap theme key
            lightOrDark: 'dark',  // 'dark' if background is dark(ish)
            fixed: null,  // fixed to top, ie always visible; null, 'top' or 'bottom'
            shadow: '',  // bootstrap shadow attr
        },
        lightOrDark: 'light',
        ftr: {  // footer
        },
        userBlock: {
            bg: 'light-primary',  // bootstrap theme key
            txt: 'white',
        },
    },
    dark: {
        btn: {
            main: 'dark-primary',  // bootstrap theme key
        },
        txt: '#C5C8C6',  // raw
        bg: '#26262a',  // raw
        hdr: {
            variant: 'dark-header-bg',  // bootstrap theme key
            lightOrDark: 'dark',  // 'dark' if background is dark(ish)
            fixed: null,  // fixed to top, ie always visible; null, 'top' or 'bottom'
            shadow: 'shadow',  // bootstrap shadow attr
        },
        lightOrDark: 'dark',
        ftr: {  // footer
        },
        userBlock: {
            bg: 'darker',  // bootstrap theme key
            txt: 'white',
        },
    },
};

export { themes };
