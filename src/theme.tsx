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
        }
    }
}