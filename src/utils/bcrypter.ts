import bcrypt from "bcrypt";

function Encrypter(value: string, saltValue: number): string {
  return bcrypt.hashSync(value, saltValue);
}

export default Encrypter;
