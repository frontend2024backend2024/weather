export function changeCssRootVariables(theme: string){
    const root = document.querySelector(':root') as HTMLElement;

    const components = [
      'body-background', 
      'body-text', 
      'primary-text', 
      'secondary-text', 
      'descriptlion-text', 
      'svg-background', 
      'section-background', 
      'cardItem-background', 
      'cardItem-section-background', 
      'tapButton-background', 
      'tapButton-background-active', 
      'popup-backgroundColor'
    ];

    components.forEach((component)=> {
      root.style.setProperty(
        `--${component}-default`, 
        `var(--${component}-${theme})`
      )
    })
}