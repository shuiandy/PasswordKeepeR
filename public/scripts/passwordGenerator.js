const passwordGen = () => {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%&*';
  const isUpper = document.getElementById('upper').checked;
  const isLower = document.getElementById('lower').checked;
  const isNum = document.getElementById('number').checked;
  const isSymbol = document.getElementById('characters').checked;
  const passLen = document.getElementById('length').value;

  const passChars = [
    isLower ? lowercase : [],
    isUpper ? uppercase : [],
    isNum ? numbers : [],
    isSymbol ? symbols : [],
  ].join('');
  console.log(passChars);
  let result = '';
  for (let i = 0; i < passLen; i += 1) {
    result += passChars.charAt(Math.floor(Math.random() * passChars.length));
  }
  document.getElementById('createPassword').value = result;
  document.getElementById('createPassword').value = result;
  navigator.clipboard.writeText(result);
  document.getElementById('createPassword').type = 'text';
  document.getElementById('createPassword').type = 'text';
  return result;
};
