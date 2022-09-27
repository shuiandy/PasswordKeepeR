const passwordGenerator = (passLength, containsLowercase = true, containsUppercase = true, containsNumbers = true, containsChars = true) => {

  if (passLength < 4){
    return Error("Please enter minimum 4 characters!");
  }

  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const specialChars = '!@#$%&*'

  let password = '';

  const randomize = function(length) {
    return Math.floor(Math.random() * length);
  }

  let chars = '';
  let remainingIntegers = passLength;

  if (containsLowercase){
    chars += lowercase;
    password += lowercase[randomize(lowercase.length)];
    remainingIntegers--;
  }

  if (containsUppercase) {
    chars += upperCase;
    password += upperCase[randomize(upperCase.length)];
    remainingIntegers--;

  }
  if (containsNumbers) {
    chars += numbers;
    password += numbers[randomize(numbers.length)];
    remainingIntegers--;
  }
  if (containsChars){
    chars += specialChars;
    password += specialChars[randomize(specialChars.length)];
    remainingIntegers--;
  }

  for (let i = 0; i < remainingIntegers; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }

  return password;
};

const copyPassword = () => {
  let copyText = document.getElementById('password');
};



const test = passwordGenerator(4, true, false, false, true);
console.log(test);



module.exports = { passwordGenerator, copyPassword };
