#!/bin/bash

echo "🔄 Restaurando arquivos de configuração do Gradle..."

if [ -f project-config/gradle/build.gradle.app.backup ]; then
  cp -f project-config/gradle/build.gradle.app.backup android/app/build.gradle
  echo "✅ build.gradle.app restaurado com sucesso."
else
  echo "⚠️ Arquivo de backup build.gradle.app.backup não encontrado."
fi

if [ -f project-config/gradle/build.gradle.root.backup ]; then
  cp -f project-config/gradle/build.gradle.root.backup android/build.gradle
  echo "✅ build.gradle.root restaurado com sucesso."
else
  echo "⚠️ Arquivo de backup build.gradle.root.backup não encontrado."
fi

if [ -f project-config/gradle/local.properties.backup ]; then
  cp -f project-config/gradle/local.properties.backup android/local.properties
  echo "✅ local.properties restaurado com sucesso!"
else
  echo "⚠️ Arquivo de backup local.properties.backup não encontrado."
fi

echo "🎉 Processo de restauração finalizado com sucesso!"
