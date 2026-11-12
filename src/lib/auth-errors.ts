// Traduz as mensagens da autenticação para português de Portugal.
const MAPA: Array<[string, string]> = [
  ["invalid login credentials", "Email ou password errados."],
  ["email not confirmed", "Ainda não confirmaste o email. Abre a carta que te mandámos."],
  ["email could not be validated", "Esse email não parece certo."],
  ["unable to validate email address", "Esse email não parece certo."],
  ["user already registered", "Esse email já tem conta. Tenta entrar em vez de criar."],
  ["for health and safety reasons", "Essa password foi usada numa fuga de dados. Escolhe outra."],
  ["password should be at least", "A password tem de ter pelo menos 6 letras."],
  ["new password should be at least", "A password tem de ter pelo menos 6 letras."],
  ["current password required", "Precisas de escrever a tua password atual."],
  ["rate limit exceeded", "Demasiadas tentativas de uma vez. Espera um pouco e tenta de novo."],
  ["email rate limit exceeded", "Já mandámos cartas a mais. Espera uma hora e tenta de novo."],
  ["email address is not allowed", "Esse email não pode receber carta. Usa um endereço a sério."],
  ["invalid or expired recovery link", "Esse link para criar password já não é válido."],
  ["frozen user", "Essa conta está suspensa."],
];

export function traduzErro(mensagem: string): string {
  const m = mensagem.toLowerCase();
  for (const [chave, texto] of MAPA) {
    if (m.includes(chave)) return texto;
  }
  return mensagem;
}
