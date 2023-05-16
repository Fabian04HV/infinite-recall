function dynamicTextSize(text){
  
  const maxSize = 50
  const minSize = 20

  let fontSize = Math.max(minSize, Math.min((250 / (text.length / 3)), maxSize));

  if(text.length > 25){
    fontSize = 28
  }
  if(text.length > 100){
    fontSize = 24
  }
  if(text.length > 200){
    fontSize = 22
  }
  if(text.length > 300 ){
    fontSize = 20
  }
  if(text.length > 400){
    fontSize = 18
  }
  if(text.length > 500){
    fontSize = 16
  }
  if(text.length > 750){
    fontSize = 14
  }
  if(text.length > 900){
    fontSize = 12
  }

  // Detect mobile devices and adjust font size
  if (window.innerWidth <= 768) { // Adjust the threshold as needed
    fontSize *= 0.65;
  }

  const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const fontSizeRem = fontSize / baseFontSize;

  return fontSizeRem
}
export default dynamicTextSize