
const typeEffect = (element, placeholder) => {
    let output = '';
    for (let i = 0; i < placeholder.length; i++) {
        let j = i;
        setTimeout(function() {
            output += placeholder[i];
            document.getElementById(element).setAttribute('placeholder', output);
        }, 50 * (j + 1));
    }
}

export default typeEffect;
