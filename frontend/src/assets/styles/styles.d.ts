import 'styled-components';

declare module 'styled-components'{
  export interface DefaultTheme {
    colors:{
      background: string;
      primary: {
        lighter: string
        light: string
        main: string
        dark: string
      },
    }
  }

  export interface CustomTheme{
    colors:{
      background: string;
      primary: {
        lighter: string
        light: string
        main: string
        dark: string
      },
    }
  }
}
