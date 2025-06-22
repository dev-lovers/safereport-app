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
- Notificações push com controle de permissão pelo usuário

## 🛠️ Tecnologias

- React Native + Expo
- React Navigation (bottom tabs + native stack)
- Context API com tipagem e persistência
- React Native Paper (UI)
- TypeScript
- AsyncStorage e SecureStore
- Expo Location, Camera, Media Library, Notifications

## 🚀 Como executar

1. **Clone o repositório**

   ```bash
   git clone https://github.com/dev-lovers/safereport-app.git
   cd safereport-app
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Crie os arquivos de configuração sensíveis (não versionados):**

   - `credentials/google-services.json` → Firebase (Android)
   - `credentials/firebase-service-account.json` → Conta de serviço do Firebase (FCM V1)

4. **Configure corretamente o arquivo `local.properties`**

   Edite o arquivo `project-config/gradle/local.properties.backup` para apontar para o caminho do Android SDK da sua máquina. Exemplos:

   - **Windows:**

     ```properties
     sdk.dir=C:\Users\your-username\AppData\Local\Android\Sdk
     ```

     ⚠️ Substitua `your-username` pelo seu nome de usuário no Windows.

   - **macOS:**

     ```properties
     sdk.dir=$HOME/Library/Android/sdk
     ```

   - **Linux:**

     ```properties
     sdk.dir=$HOME/Android/Sdk
     ```

5. **Restaure a build de desenvolvimento**

   **Windows:**

   ```bash
   npm run restore:windows
   ```

   **macOS/Linux:**

   ```bash
   npm run restore:unix
   ```

6. **Execute em um dispositivo físico** (obrigatório para notificações push)

   ```bash
   npm run android
   ```

## 📲 Testar envio de notificação manual (via CURL)

```bash
curl -X POST https://exp.host/--/api/v2/push/send   -H "Content-Type: application/json"   -d '{
    "to": "ExpoPushToken[SEU_TOKEN]",
    "title": "🔔 Notificação de Teste",
    "body": "Seu push está funcionando corretamente!",
    "sound": "default"
  }'
```

## 🔗 Repositório

Acesse diretamente: [github.com/dev-lovers/safereport-app](https://github.com/dev-lovers/safereport-app)

## 🧠 Observações técnicas

- Arquitetura escalável com separação de contexto por domínio
- Navegação desacoplada e tipada
- Modularização por funcionalidade (pasta `screens/`)
- Alias de paths configurado via `tsconfig.json` e `babel.config.js`
- Integração com Firebase usando FCM V1
- Scripts de automação para restauração
- Notificações compatíveis apenas com dispositivo físico

## 📄 Licença

Projeto acadêmico sem fins lucrativos. Direitos reservados à equipe de desenvolvimento.

---

**Desenvolvido por:**  
Cláudio Zicri Santos da Silva  
Filipe Asaf Mota Mendes  
Joshua Strauch Costa Britto  
Rafael Sampaio de Jesus
