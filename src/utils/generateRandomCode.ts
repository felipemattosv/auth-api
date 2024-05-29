export function generateRandomCode(codeLenght: number): string {

  let code: string = "";
  const characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*-=+?";

  for (let i = 0; i < codeLenght; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return code;
}
