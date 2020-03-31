/**
 * color settings for different areas (eg hdr, footer),
 * by primary bootstrap theme (eg 'primary')
 * @type {{}}
 */
const themes = {
    defaultTheme: 'light',
    light: {
        btn: {
            main: 'primary',  // bootstrap theme key
        },
        txt: '#222',  // raw
        bg: 'white',  // raw
        hdr: {
            variant: 'primary',  // bootstrap theme key
            lightOrDark: 'dark',  // 'dark' if background is dark(ish)
            fixed: null,  // fixed to top, ie always visible; null, 'top' or 'bottom'
        },
        ftr: {  // footer

        },
        userBlock: {
            bg: 'primary',  // bootstrap theme key
            txt: 'white',
        },
    },
};

export { themes };
