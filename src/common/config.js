/**
 * color settings for different areas (eg hdr, footer),
 * by primary bootstrap theme (eg 'primary')
 * @type {{}}
 */
const themes = {
    defaultTheme: 'light',
    light: {
        btn: 'primary',  // bootstrap key
        txt: '#222',  // raw
        bg: 'white',  // raw
        hdr: {
            variant: 'primary',
            lightOrDark: 'dark',  // 'dark' if background is dark(ish)
            fixed: null,  // fixed to top, ie always visible; null, 'top' or 'bottom'
        },
        ftr: {  // footer

        },
        userBlock: {
            bg: 'primary',
        },
    },
};

export { themes };
