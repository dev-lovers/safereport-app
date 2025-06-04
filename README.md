# SafeReport

Aplicativo de denúncias seguras, anônimas e com geolocalização, desenvolvido em React Native com Expo.  
Este projeto faz parte de um programa de extensão universitária do curso de Ciência da Computação da Unijorge, com foco em **cibersegurança urbana** e alinhamento aos Objetivos de Desenvolvimento Sustentável (ODS 11 e 16).

## 📱 Funcionalidades previstas

- Envio de denúncias de forma anônima
- Captura de geolocalização do usuário
- Criptografia de ponta a ponta para proteção dos dados
- Interface acessível e simples para uso comunitário

## 🚀 Tecnologias e Ferramentas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Navigation](https://reactnavigation.org/)
- [Expo Location](https://docs.expo.dev/versions/latest/sdk/location/)
- [Expo SecureStore ou Crypto](https://docs.expo.dev/versions/latest/sdk/securestore/)

## 📂 Estrutura de Pastas

```
safereport-app/
├── assets/            # Imagens, ícones, fontes, logos
│   ├── icons/
│   ├── images/
│   ├── fonts/
│   └── logos/
├── src/
│   ├── components/    # Componentes reutilizáveis
│   ├── screens/       # Telas do app
│   ├── services/      # Integração com APIs ou Firebase
│   ├── context/       # Contextos globais (ex: auth, location)
│   ├── hooks/         # Custom hooks
│   ├── navigation/    # Navegação do app
│   ├── utils/         # Utilitários e helpers
│   └── types/         # Tipagens globais
├── App.tsx
├── app.json
├── index.ts
├── tsconfig.json
```

## ▶️ Executando o projeto

```bash
npm install
npx expo start
```

## 📄 Licença

Projeto acadêmico sem fins lucrativos. Direitos reservados à equipe de desenvolvimento.

---

**Desenvolvido por:**  
Cláudio Zicri Santos da Silva  
Filipe Asaf Mota Mendes  
Joshua Strauch Costa Britto  
Rafael Sampaio de Jesus
