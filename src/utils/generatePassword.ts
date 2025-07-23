export function generatePassword(
  length: number = 8,
  includeUppercase: boolean = true,
  includeLowercase: boolean = true,
  includeNumbers: boolean = true,
): string {
  const uppercaseCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseCharset = "abcdefghijklmnopqrstuvwxyz";
  const numberCharset = "0123456789";

  let charset = "";
  let password = "";

  if (includeUppercase) {
    charset += uppercaseCharset;
    password +=
      uppercaseCharset[Math.floor(Math.random() * uppercaseCharset.length)];
  }
  if (includeLowercase) {
    charset += lowercaseCharset;
    password +=
      lowercaseCharset[Math.floor(Math.random() * lowercaseCharset.length)];
  }
  if (includeNumbers) {
    charset += numberCharset;
    password += numberCharset[Math.floor(Math.random() * numberCharset.length)];
  }

  if (charset === "") {
    throw new Error("At least one character set must be included.");
  }

  for (let i = password.length; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}
