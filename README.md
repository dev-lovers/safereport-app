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
- Exibição de **mapa interativo com ocorrências de violência** via [API Fogo Cruzado](https://api.fogocruzado.org.br)

## 🛠️ Tecnologias

- React Native + Expo
- React Navigation (bottom tabs + native stack)
- Context API com tipagem e persistência
- React Native Paper (UI)
- TypeScript
- AsyncStorage e SecureStore
- Expo Location, Camera, Media Library, Notifications
- Axios + API externa (Fogo Cruzado)
- React Native Maps (visualização geográfica)

## ⚙️ Variáveis de ambiente

Este projeto utiliza variáveis de ambiente para lidar com credenciais sensíveis de APIs externas.

### Como configurar:

1. **Crie um ambiente com variáveis no EAS:**

```bash
eas env:create
```

2. **Baixe as variáveis localmente:**

```bash
eas env:pull --environment development
```

Isso irá gerar automaticamente um arquivo `.env.local` na raiz do projeto com o conteúdo do ambiente de desenvolvimento.

> ⚠️ O arquivo `.env.local` é ignorado pelo Git e **não deve ser versionado**.

## 🔧 Configuração manual após `npx expo prebuild --clean`

Após gerar a pasta `android/`, você **precisará aplicar algumas modificações obrigatórias** para que o projeto funcione corretamente:

### 1. `android/app/build.gradle`

Abra o arquivo e:

- **Adicione as dependências do Firebase**:

  ```groovy
  dependencies {
    implementation platform('com.google.firebase:firebase-bom:33.15.0')
    implementation 'com.google.firebase:firebase-analytics'
  }
  ```

- **Adicione o plugin do Google Services** (no fim do arquivo):

  ```groovy
  apply plugin: 'com.google.gms.google-services'
  ```

- **Verifique se a `signingConfigs.debug` existe**:
  ```groovy
  signingConfigs {
    debug {
      storeFile file('debug.keystore')
      storePassword 'android'
      keyAlias 'androiddebugkey'
      keyPassword 'android'
    }
  }
  ```

### 2. `android/build.gradle`

⚠️ Este arquivo não precisa de modificações no momento, **desde que a versão `com.google.gms:google-services` seja compatível (`4.4.x`)**.

Se necessário, atualize:

```groovy
classpath 'com.google.gms:google-services:4.4.2'
```

### 3. `android/local.properties`

Esse arquivo é **obrigatório para builds locais**. Crie-o na raiz da pasta `android/` com o seguinte conteúdo (exemplo para Windows):

```properties
sdk.dir=C:\\Users\\SEU_USUARIO\\AppData\\Local\\Android\\Sdk
```

📌 Esse arquivo **não deve ser versionado**.

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

- `.env.local` → [Variáveis de ambiente](#⚙️-variáveis-de-ambiente)
- `android/` → [Configuração manual](#🔧-configuração-manual-após-npx-expo-prebuild--clean)

4. **Execute em um dispositivo físico** (obrigatório para notificações push)

```bash
npm run android
```

## 📲 Testar envio de notificação manual (via CURL)

```bash
curl -X POST https://exp.host/--/api/v2/push/send \
  -H "Content-Type: application/json" \
  -d '{
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
- Integração com API Fogo Cruzado para visualização de ocorrências georreferenciadas
- Tokens de acesso autenticados dinamicamente via JWT
- Notificações compatíveis apenas com dispositivo físico

## 📄 Licença

Projeto acadêmico sem fins lucrativos. Direitos reservados à equipe de desenvolvimento.

---

**Desenvolvido por:**  
Cláudio Zicri Santos da Silva  
Filipe Asaf Mota Mendes  
Joshua Strauch Costa Britto  
Rafael Sampaio de Jesus
