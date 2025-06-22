@echo off
echo 🔄 Restaurando arquivos de configuração do Gradle...

REM Verifica se os arquivos de backup existem antes de copiar

IF EXIST project-config\gradle\build.gradle.app.backup (
    copy /Y project-config\gradle\build.gradle.app.backup android\app\build.gradle
    echo ✅ build.gradle.app restaurado com sucesso.
) ELSE (
    echo ⚠️ Arquivo de backup build.gradle.app.backup não encontrado.
)

IF EXIST project-config\gradle\build.gradle.root.backup (
    copy /Y project-config\gradle\build.gradle.root.backup android\build.gradle
    echo ✅ build.gradle.root restaurado com sucesso.
) ELSE (
    echo ⚠️ Arquivo de backup build.gradle.root.backup não encontrado.
)

IF EXIST project-config\gradle\local.properties.backup (
    copy /Y project-config\gradle\local.properties.backup android\local.properties
    echo ✅ local.properties restaurado com sucesso.
) ELSE (
    echo ⚠️ Arquivo de backup local.properties.backup não encontrado.
)

echo 🎉 Processo de restauração finalizado.
pause
