export function validarFormatoCEP(cep: string) {
  const formatoCEP = /^\d{8}$/;
  return formatoCEP.test(cep);
}
