const passwordGenerator = (passLength) => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let password = '';
  for (let i = 0; i <= passLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  console.log(password);
};

const copyPassword = () => {
  let copyText = document.getElementById('password');
};
passwordGenerator(15);
module.exports = { passwordGenerator, copyPassword };
