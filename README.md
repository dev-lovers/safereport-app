<p align="center">
  <img src="./assets/logos/logo.png" alt="SafeReport Logo" height="160"/>
</p>

# SafeReport

Aplicativo de denúncias seguras, anônimas e com geolocalização, desenvolvido em React Native com Expo.  
Este projeto faz parte de um programa de extensão universitária do curso de Ciência da Computação da Unijorge, com foco em **cibersegurança urbana** e alinhamento aos Objetivos de Desenvolvimento Sustentável (ODS 11 e 16).

## 📱 Funcionalidades previstas

- Envio de denúncias de forma anônima
- Captura de geolocalização do usuário
- Criptografia de ponta a ponta para proteção dos dados
- Interface acessível e simples para uso comunitário

## 🛠️ Tecnologias

- React Native + Expo
- React Navigation (bottom tabs + native stack)
- Context API com tipagem e persistência
- React Native Paper (UI)
- TypeScript
- AsyncStorage e SecureStore
- Expo Location, Camera, Media Library, Notifications

## 🚀 Como executar

1. Clone o repositório

   ```bash
   git clone https://github.com/dev-lovers/safereport-app.git
   cd safereport-app
   ```

2. Instale as dependências

   ```bash
   npm install
   ```

3. Inicie o app

   ```bash
   npx expo start
   ```

## 🔗 Repositório

Acesse diretamente: [github.com/dev-lovers/safereport-app](https://github.com/dev-lovers/safereport-app)

## 🧠 Observações técnicas

- Arquitetura escalável com separação de contexto por domínio
- Navegação desacoplada e tipada
- Pasta `screens/` modularizada por funcionalidade
- Alias de paths configurado via `tsconfig` e `babel.config.js`

## 📄 Licença

Projeto acadêmico sem fins lucrativos. Direitos reservados à equipe de desenvolvimento.

---

**Desenvolvido por:**  
Cláudio Zicri Santos da Silva  
Filipe Asaf Mota Mendes  
Joshua Strauch Costa Britto  
Rafael Sampaio de Jesus
