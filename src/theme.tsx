// 1. Import the `HopeThemeConfig` type
import { HopeThemeConfig } from "@hope-ui/solid"

// 2. Create a theme config and pass your custom values
export const themeConfig: HopeThemeConfig = {
    initialColorMode: "light",
    lightTheme: {
        colors: {
            primary1: "#e2c7ff",
            primary2: "#d5adff",
            primary3: "#c690ff",
            primary4: "#b876ff",
            primary5: "#a857ff",
            primary6: "#9d41ff",
            primary7: "#922cff",
            primary8: "#891aff",
            primary9: "#830eff",
            primary10: "#7e0bfa",
            primary11: "#7603f1",
            primary12: "#7603f1",
            "roxinho": "#d3b1f8",
            "roxinho-bg": "#f0e3ff",
            "roxinho-hover": "#ddc7f5",
            "primary-hover": "#9e4ff3",
            "primary-focus": "#5b00bd",
            "text-primary": "#4a4c4f",
            "text-primary2": "#6a4494",
            "paper": "#f7f4f8",
            "background": "#f0f0fa80",
            "background-dark": "#e7e7f180",
            "verde": "#5dff80",
            "verde-dark": "#188d31",
            "verdinho": "#a3ffb7",
            "vermelho": "#ff3232",
            "vermelho-dark": "#7c0f0f",
            "vermelhinho": "#ff9595",
            "cinza": "#707070",
            "cinza_hover": "#707070BF",
            "cinzinha": "#F6F6F6",
            "cinzinha_hover": "#F6F6F6BF",
        }
    },
    components: {
        Button: {
            baseStyle: {
                root: {
                    borderRadius: '16px',
                    height: '30px',
                    fontSize: '14px',
                    // background: "$primary1",
                    _hover: {
                        background: 'var(--primary-hover)'
                    },
                    _focus: {
                        // background: 'var(--primary-hover)',
                        boxShadow: "inset 0px 0px 0px 2px var(--primary-focus)"
                    },
                    "&[class*='dashed']:hover": {
                        background: 'var(--roxinho-hover)'
                    },
                    "&[class*='outline']:hover": {
                        background: 'var(--roxinho-hover)'
                    }
                }
            }
        },
        Progress: {
            baseStyle: {
                root: {
                    borderRadius: '30px'
                }
            }
        },
        Input: {
            baseStyle: {
                input: {
                    borderRadius: '17px',
                    "&[class*='filled']": {
                        background: 'var(--bg)'
                    } 
                }
            },
            defaultProps: {
                input: {
                    variant: "filled"
                }
            }
        },
        Textarea: {
            baseStyle: {
                borderRadius: '17px',
                "&[class*='filled']": {
                    background: 'var(--bg)'
                } 
            },
            defaultProps: {
                variant: "filled"
            }
        }
    }
}